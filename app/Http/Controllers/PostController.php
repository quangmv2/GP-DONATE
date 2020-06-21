<?php


namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;


class PostController extends Controller
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
        $categories = Category::whereNull('type')->orWhereIn('type', ['all', 'post'])->get();
        return view('dashboard.posts.index',compact('categories'));
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
        $searchCategory = $request->input('searchByCategory');

        $orderColumn = isset($order) ? $columns[$order[0]['column']]['data'] : 'id';
        $orderDesc = isset($order) ? $order[0]['dir'] : 'desc';
        $length = isset($length) && $length > 0 ? $length : 10;
        $page = isset($start) ? ($start/$length + 1) : 1;
        $search = isset($search) ? $search['value'] : '';

        //condtion to search by status
        $valueSearchStatus = [0, 1];
        switch ($searchStatus) {
            case '1':
                $valueSearchStatus = [1];
                break;
            case '0':
                $valueSearchStatus = [0];
                break;
            case '-1':
                $valueSearchStatus = [-1];
                break;
            default:
                $valueSearchStatus = [0, 1];
                break;
        }
       
        $query = Post::whereIn('status', $valueSearchStatus)
            ->where(function($q){
                $q->whereNull('post_type')
                    ->orWhere('post_type', constants('post_type.post'));
                })
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                });

        //fiter by category
        //case 1 search by all
         $query = $query->with('categories');

         //filter by condition
        if(!(!$searchCategory || $searchCategory == "" || $searchCategory == "all")){
           // filter by category id
            $query = $query
                ->whereHas('categories', function($q) use ($searchCategory) {
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
        $categories = Category::whereNull('type')->orWhereIn('type', ['all', 'post'])->get();
        return view('dashboard.posts.create', compact('categories'));
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


        //Post::create($request->all());
        $categories = $request->input('category');

        $post = new Post;
        $post->title = $request->title;
        $post->slug = str_slug($request->title, "-");
        $post->status = $request->status;
        $post->description = $request->description;
        $post->content = $request->content;
        $post->feature_image = $request->feature_image;
        $post->post_type = constants('post_type.post');
        //$post->audio = $request->audio;
        $post->user()->associate($request->user());
        $post->save();
        $post->categories()->attach($categories);
        $post->save();

        return redirect()->route('posts.index')
                        ->with('success','Post created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('dashboard.posts.detail',compact('post'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        $categories = Category::whereNull('type')->orWhereIn('type', ['all', 'post'])->get();
        $postCategories = DB::table("category_post")->where("category_post.post_id",$post->id)
            ->pluck('category_post.category_id','category_post.category_id')
            ->all();
        return view('dashboard.posts.edit',compact('post', 'categories', 'postCategories'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {

         request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $categories = $request->input('category');
        $post->update($request->all());
        $post->update(['slug' => str_slug($post->title)]);
        //$post->is_audio = $request->input('is_audio');
        $post->save();
        $post->categories()->sync($categories);

        return redirect()->route('posts.index')
                        ->with('success','Post updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        // $post->delete();
        $post->status = -1;
        $post->save();

        return redirect()->route('posts.index')
                        ->with('success','Post deleted successfully');
    }
}