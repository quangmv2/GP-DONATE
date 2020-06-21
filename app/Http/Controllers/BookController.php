<?php


namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;


class BookController extends Controller
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
         $this->middleware('permission:post-list|post-create|post-edit|post-delete', ['only' => ['index','show']]);
         $this->middleware('permission:post-create', ['only' => ['create','store']]);
         $this->middleware('permission:post-edit', ['only' => ['edit','update']]);
         $this->middleware('permission:post-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::where('type','book')->get();
        return view('dashboard.books.index',compact('categories'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $order = $request->input('order');
        $columns = $request->input('columns');
        $length = $request->input('length');
        $start = $request->input('start');
        $search = $request->input('search');
        $searchStatus = $request->input('searchByStatus');
        $searchCategory =$request->input('searchByCategory');

        $orderColumn = isset($order) ? $columns[$order[0]['column']]['data'] : 'id';
        $orderDesc = isset($order) ? $order[0]['dir'] : 'desc';
        $length = isset($length) && $length > 0 ? $length : 10;
        $page = isset($start) ? ($start/$length + 1) : 1;
        $search = isset($search) ? $search['value'] : '';

        $valueSearchStatus = [0,1];
        {
            switch ($searchStatus) 
            {
                case '1':
                    $valueSearchStatus = [1];
                    break;
                case '0':
                    $valueSearchStatus = [0];
                    # code...
                    break;
                case '-1':
                    $valueSearchStatus = [-1];
                    # code...
                    break;
                default:
                    $valueSearchStatus = [0,1];
                    # code...
                    break;
            }
        }
        $query = Post::whereIn('status', $valueSearchStatus)
            ->whereNull('parent_id')
            ->where('post_type', constants('post_type.book'))
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;
            
        $query = $query->with('categories');
        if(!(!$searchCategory || $searchCategory == "" || $searchCategory == "all"))
        {
            $query = $query
            ->whereHas('categories', function($q) use ($searchCategory)
            {
                 $q->where('categories.id', '=', $searchCategory);
            });
        }

        $totalSearch = $query->count();
        $data = $query->orderBy($orderColumn, $orderDesc)->paginate($length, ['*'], 'page', $page);

        return Response::json([
            'recordsFiltered' => $totalSearch,
            'recordsTotal' => $totalSearch,
            'data' => $data->toArray()['data'],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = Category::whereIn('type', ['all','book'])->get();
        return view('dashboard.books.create', compact('categories'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);


        $categories = $request->input('category');

        $book = new Post;
        $book->title = $request->title;
        $book->slug = str_slug($request->title, "-");
        $book->status = $request->status;
        $book->description = $request->description;
        $book->content = $request->content;
        $book->author = $request->author;
        $book->feature_image = $request->feature_image;
        $book->post_type = constants('post_type.book');
        $book->user()->associate($request->user());
        $book->save();
        $book->categories()->attach($categories);
        $book->save();

        return redirect()->route('books.index')
                        ->with('success','Book created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $book)
    {
        return view('dashboard.books.detail',compact('book'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $book)
    {
        $categories = Category::whereIn('type', ['all','book'])->get();
        $postCategories = DB::table("category_post")->where("category_post.post_id",$book->id)
            ->pluck('category_post.category_id','category_post.category_id')
            ->all();

        $chapters = Post::where('parent_id', $book->id)->whereIn('status', [0,1])->orderBy('post_order', 'asc')->get();
        return view('dashboard.books.edit',compact('book', 'categories', 'postCategories', 'chapters'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $book)
    {

        request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $chapters_order = [];
        $categories = $request->input('category');
        $textBookChapter = $request->input('chapters_order');
        $book->update($request->all());
        $book->update(['slug' => str_slug($book->title)]);
        $book->save();
        $book->categories()->sync($categories);

        if( $request->input('chapters_order') != ""){
            $chapters_order = json_decode($request->input('chapters_order'));
        }

        if(trim($textBookChapter) != ""){

            $book_id = $book->id;
            $caseString = 'case id';
            $ids = '';
            foreach ($chapters_order as $key => $value) {
                $id = key($value);
                $order = get_object_vars($value);
                $order_index = $order[$id];
                $ids .= " $id,";
                $caseString .= " when $id then $order_index";
            }

            $ids = trim($ids, ',');
            if($ids != ""){
                DB::update("update posts set post_order = $caseString end where id in ($ids)");
                DB::delete("update posts set status = -1 where parent_id = $book_id and id not in ($ids) ");
            }else{
                DB::delete("update posts set status = -1 where parent_id = $book_id");
            }
            
        }

        return redirect()->route('books.index')
                        ->with('success','Book updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $book)
    {
        // $book->delete();
        $book->status = -1;
        $book->save();

        return redirect()->route('books.index')
                        ->with('success','Book deleted successfully');
    }
}