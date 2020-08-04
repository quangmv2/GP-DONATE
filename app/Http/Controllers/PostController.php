<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use DB;
use Response;

use App\Models\Hastag;
use App\Models\Post;

use App\Services\PostService;

class PostController extends Controller
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct(PostService $postService)
    {
        $this->postService = $postService;
    //      $this->middleware('permission:post-list|post-create|post-edit|post-delete', ['only' => ['index','show']]);
    //      $this->middleware('permission:post-create', ['only' => ['create','store']]);
    //      $this->middleware('permission:post-edit', ['only' => ['edit','update']]);
    //      $this->middleware('permission:post-delete', ['only' => ['destroy']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // $categories = Category::whereNull('type')->orWhereIn('type', ['all', 'post'])->get();
        $hastags = Hastag::all();
        return view('dashboard.posts.index', ['hastags' => $hastags]);
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
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%');
                    // ->orWhere('description', 'like', '%'.$search.'%');
            });

        //fiter by category
        // //case 1 search by all
         $query = $query->with('hastags');

        //  //filter by condition
        if(!(!$searchCategory || $searchCategory == "" || $searchCategory == "all")){
           // filter by category id
            $query = $query
                ->whereHas('hastags', function($q) use ($searchCategory) {
                    $q->where('hastags.id', '=', $searchCategory);
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
        return view('dashboard.posts.create');
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Post $post)
    {
        $tmp = [];
        foreach ($post->hastags as $key => $value) {
            $tmp[] = $value->value;
        }
        return view('dashboard.posts.edit', [ 'post' => $post, 'hastags' => $tmp]);
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
        $request->validate([
            'title' =>'required',
            // 'content' =>'required',  
            'photo_thumbnail' => 'required',
            'due_day' => 'required|date|date_format:"Y-m-d"|after:now',
        ]);
        $hastags = explode(',', $request->input('hastags'));
        $photo_thumbnail = empty($request->input('photo_thumbnail'))?$post->photo_thumbnail:$request->input('photo_thumbnail');
        $post->update([
            'title' => $request->title,
            'photo_thumbnail' => $photo_thumbnail,
            'due_day' => $request->due_day." 00:00:00"
        ]);
        \App\Models\PostHasHastag::where('post_id', $post->id)->delete();
        $this->postService->createAndAddHastag($post->id, $hastags);
        return redirect()->route('posts.index')
                        ->with('success','Post update successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id)->delete();  
        return redirect()->back()
                        ->with('success','Post deleted successfully');
    }

    public function hiddenPost($id)
    {
        Post::find($id)->update([
            'status' => 0
        ]);
        return redirect()->back()
                        ->with('success','Post hidden successfully');
    }

    public function showPost($id)
    {
        Post::find($id)->update([
            'status' => 1
        ]);
        return redirect()->back()
                        ->with('success','Post showed successfully');
    }
}