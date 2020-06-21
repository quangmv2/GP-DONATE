<?php


namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;


class AudioController extends Controller
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
        $categories = Category::where('type','audio')->get();
        return view('dashboard.audios.index',compact('categories'));

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


        $valueSearchStatus = [0, 1];
        switch ($searchStatus) 
        {
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
            ->where('post_type', constants('post_type.audio'))
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;
        $query =$query->with('categories');
        if (!(!$searchCategory || $searchCategory == "" || $searchCategory == "all")) 
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
        $categories = Category::whereIn('type', ['all','audio'])->get();
        return view('dashboard.audios.create', compact('categories'));
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

        $audio = new Post;
        $audio->title = $request->title;
        $audio->slug = str_slug($request->title, "-");
        $audio->status = $request->status;
        $audio->description = $request->description;
        $audio->content = $request->content;
        $audio->feature_image = $request->feature_image;
        $audio->post_type = constants('post_type.audio');
        $audio->audio = $request->audio;
        $book->author = $request->author;
        $audio->user()->associate($request->user());
        $audio->save();
        $audio->categories()->attach($categories);
        $audio->save();

        return redirect()->route('audios.index')
                        ->with('success','Audio created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $audio)
    {
        return view('dashboard.audios.detail',compact('audio'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $audio)
    {
        $categories = Category::whereIn('type', ['all','audio'])->get();
        $postCategories = DB::table("category_post")->where("category_post.post_id",$audio->id)
            ->pluck('category_post.category_id','category_post.category_id')
            ->all();
        return view('dashboard.audios.edit',compact('audio', 'categories', 'postCategories'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $audio)
    {

         request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
        $categories = $request->input('category');
        $audio->update($request->all());
        $audio->update(['slug' => str_slug($audio->title)]);
        //$post->is_audio = $request->input('is_audio');
        $audio->save();
        $audio->categories()->sync($categories);

        return redirect()->route('audios.index')
                        ->with('success','Audio updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $audio)
    {
        $audio->status = -1;
        $audio->save();
        // $audio->delete();

        return redirect()->route('audios.index')
                        ->with('success','Audio deleted successfully');
    }
}