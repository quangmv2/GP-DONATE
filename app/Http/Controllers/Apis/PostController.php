<?php


namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use DB;
use Response;
use App\Services\CommonService;
use App\Services\PostService;



class PostController extends Controller
{ 

    private PostService $postService;
    private CommonService $commonService;


    function __construct(PostService $postService, CommonService $commonService){
        $this->postService = $postService;
        $this->commonService = $commonService;

        // $this->middleware('cors', ['except' => ['showPhoto']]);
        $this->middleware('auth:api', ['except' => ['showPhoto']]);

        $this->middleware('permission:post-list|post-list-all|post-edit|post-delete', ['only' => ['index']]);
        $this->middleware('permission:post-create', ['only' => ['store']]);
        $this->middleware('permission:post-edit|post-edit-all', ['only' => ['update']]);
        $this->middleware('permission:post-delete|post-delete-all', ['only' => ['destroy']]);

    }

    /**
     * @SWG\Get(
     *     path="/api/posts",
     *     tags={"Posts"},
     *     summary={"Posts list"},
     *     description="Return posts list",
     *     @SWG\Parameter(
     *         name="order",
     *         in="query",
     *         type="string",
     *         description="Order Coulumn need to Order By, default is created_date",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="length",
     *         in="query",
     *         type="int",
     *         description="Length of record need to response",
     *         required=false,
     *     ),
     *      @SWG\Parameter(
     *         name="start",
     *         in="query",
     *         type="int",
     *         description="Start possition",
     *         required=false,
     *     ),
     *		@SWG\Parameter(
     *         name="Seach",
     *         in="query",
     *         type="string",
     *         description="Seach value",
     *         required=false,
     *     ),
     *      @SWG\Parameter(
     *         name="category",
     *         in="query",
     *         type="string",
     *         description="Category Id",
     *         required=false,
     *     ),
     *      @SWG\Parameter(
     *         name="orderDesc",
     *         in="query",
     *         type="string",
     *         description="orderDesc",
     *         required=false,
     *      ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *     	   @SWG\Schema(type="object",
     *         		@SWG\Property(property="data", type="object"),
     *         		@SWG\Property(property="recordsTotal", type="number"),
     *         		@SWG\Property(property="recordsFiltered", type="number"),
     *     		)
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function index(Request $request)
    {
        $limit = $request->get('limit');
        $page = $request->get('page');
        return $this->postService->getPostPaginate($page, $limit);      
    }


    /**
     * @SWG\Get(
     *     path="/api/posts/{id}",
     *     tags={"Posts"},
     *     summary={"Post detail"},
     *     description="Return post detail by Id",  
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         type="integer",
     *         description="Length of record need to response",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *              @SWG\Property(property="data", type="object"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function detail($id){

        $post = Post::where('id', $id)->whereIn('status', [1])
                    ->where('post_type', constants('post_type.post'))->with('categories')->first();
        $postCategories = DB::table("category_post")->where("category_post.post_id",$id)
            ->pluck('category_post.category_id')
            ->all();

        $postRelated = Post::select('posts.id','title', 'slug', 'description', 'feature_image')
            ->distinct()
            ->join('category_post', 'posts.id', '=', 'category_post.post_id')
            ->whereIn('category_post.category_id', $postCategories)
            ->where('posts.id', "<>", $id)
            ->take(10)
            ->get();

        $postRelated = CommonService::filterArray($postRelated);
        $data = CommonService::filterArray($post);
        $data->related = $postRelated;
        return Response::json([
            'data' => $data ? $data : [],
        ]);
    }

    /**
     * POST route
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        
        $this->postService->validate($req);

        $post = $this->postService->save(
            $req->title, 
            $req->content, 
            $req->photo_thumbnail, 
            $req->full_photo, 
            $req->due_day,
            $req->user()->id
        );

       return response()->json(json_decode($post), 201);
    }


    /**
     * GET route  {id_post}
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if ($id == "me") 
            return $this->postService->getPostPaginateByUser($request->get('limit'), $request->user()->id);
        $post = Post::FindOrFail($id);
        $post->user;
        return response()->json(json_decode($post), 200);
    }


    /**
     * GET route {id_post}/edit
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {

    }


    /**
     * PUT/PATCH route {id_post}
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        if ($post->user_id != $request->user()->id) return response()->json(['message' => 'FORBIDDEN'], 403);

        $this->postService->validate($request);
        
        $post = $this->postService->update($id, $request->all());
        return response()->json(json_decode($post), 200);
    }


    /**
     * DELETE route {id_posts}
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $post = Post::findOrFail($id);
        if ($post->user_id != $request->user()->id) return response()->json(['message' => 'FORBIDDEN'], 403);
        $post->delete();
        return response()->json(["message" => "success"], 200);
    }


    public function storePhoto(Request $request)
    {
        $request->validate([
            'photo' =>'required|image|mimes:jpeg,png,jpg,gif,svg|max:20480',
        ]);
        return $this->postService->saveImage($request->file('photo'));
    }

    public function showPhoto(Request $request)
    {
        return $this->commonService->showImage($request->get('dir'));        
    }
    
    public function getComments(Request $request, $id)
    {
        $comments = \App\Models\Comment::where('post_id', $id)->get();
        foreach ($comments as $key => $comment) {
            $comment->user;
        }
        return $comments;
    }

}