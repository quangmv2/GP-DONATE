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

    private $postService;
    private $commonService;


    function __construct(PostService $postService, CommonService $commonService, Request $request){

        $this->request = $request;
        $this->postService = $postService;
        $this->commonService = $commonService;

        // $this->middleware('cors', ['except' => ['showPhoto']]);
        $this->middleware('auth:api', ['except' => ['showPhoto']]);

        // $this->middleware('permission:post-list|post-list-all|post-edit|post-delete', ['only' => ['index']]);
        // $this->middleware('permission:post-create', ['only' => ['store']]);
        // $this->middleware('permission:post-edit|post-edit-all', ['only' => ['update']]);
        // $this->middleware('permission:post-delete|post-delete-all', ['only' => ['destroy']]);

    }

    /**
     * @SWG\Get(
     *     path="api/posts",
     *     tags={"Posts"},
     *     summary={"Posts list"},
     *     description="Return posts list",
     *     @SWG\Parameter(
     *         name="limit",
     *         in="query",
     *         type="string",
     *         description="Số lượng bài trong 1 lần load thêm",
     *         required=false,
     *     ),
     *		@SWG\Parameter(
     *         name="page",
     *         in="query",
     *         type="string",
     *         description="Trang thứ page",
     *         required=false,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *     	   @SWG\Schema(type="array",
     *          @SWG\Items(
     *              @SWG\Property(property="id", type="number", example=1),
     *              @SWG\Property(property="user_id", type="number", example=1),
     *              @SWG\Property(property="title", type="string", example="First Project"),
     *              @SWG\Property(property="content", type="string", example="Hello World"),
     *              @SWG\Property(property="photo_thumbnail", type="string", example="..."),
     *              @SWG\Property(property="full_photo", type="string", example="..."),
     *              @SWG\Property(property="due_day", type="string", example="2000-12-03 12:20:20"),
     *              @SWG\Property(property="status", type="number", example=0   ),
     *              @SWG\Property(property="user", type="object",
        *              @SWG\Property(property="id", type="number", example=1),
        *              @SWG\Property(property="first_name", type="string", example="admin"),
        *              @SWG\Property(property="last_name", type="string", example="admin"),
        *              @SWG\Property(property="username", type="string", example="admin"),
        *              @SWG\Property(property="email", type="string", example="admin@gmail.com"),
        *              @SWG\Property(property="address", type="string", example="Danang, Vietnam"),
        *              @SWG\Property(property="code_id", type="string", example="admincode"),
        *              @SWG\Property(property="personal_photo", type="string", example="..."),
        *              @SWG\Property(property="gender", type="number", example=0),
        *              @SWG\Property(property="created_at", type="string", example="2000-12-03 12:20:20"),
        *              @SWG\Property(property="updated_at", type="string", example="2000-12-03 12:20:20"),
        *          ),
    *            @SWG\Property(property="created_at", type="string"),
    *            @SWG\Property(property="updated_at", type="string"),
    *             ),
     *     		),
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
        $posts = $this->postService->getPostPaginate($limit); 
        foreach ($posts as $key => $post) {
            $post->user;
            $post->likes;
            $post["comments"] = $post->comments;
            foreach ($post["comments"] as $key => $comment) {
                $comment->user;
            }
        }     
        return $posts;
    }

    /**
     * @SWG\Post(
     *     path="api/posts/",
     *     tags={"Posts"},
     *     summary={"Create Post"},
     *     description="Create Post",  
     *     @SWG\Parameter(
     *         name="title",
     *         in="formData",
     *         type="string",
     *         description="Title Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="content",
     *         in="formData",
     *         type="string",
     *         description="Content Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="photo_thumbnail",
     *         in="formData",
     *         type="string",
     *         description="Photo thumbnail Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="full_photo",
     *         in="formData",
     *         type="string",
     *         description="Full photo Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="due_day",
     *         in="formData",
     *         type="string",
     *         description="Due day Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="offers",
     *         in="formData",
     *         type="object",
     *         description="Due day Post",
     *         required=true,
     *         @SWG\Property(property="id", type="number", example=1),
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *              @SWG\Property(property="id", type="number", example=1),
     *              @SWG\Property(property="user_id", type="number", example=1),
     *              @SWG\Property(property="title", type="string", example="First Project"),
     *              @SWG\Property(property="content", type="string", example="Hello World"),
     *              @SWG\Property(property="photo_thumbnail", type="string", example="..."),
     *              @SWG\Property(property="full_photo", type="string", example="..."),
     *              @SWG\Property(property="due_day", type="string", example="2000-12-03 12:20:20"),
     *              @SWG\Property(property="status", type="number", example=0   ),
     *              @SWG\Property(property="user", type="object",
        *              @SWG\Property(property="id", type="number", example=1),
        *              @SWG\Property(property="first_name", type="string", example="admin"),
        *              @SWG\Property(property="last_name", type="string", example="admin"),
        *              @SWG\Property(property="username", type="string", example="admin"),
        *              @SWG\Property(property="email", type="string", example="admin@gmail.com"),
        *              @SWG\Property(property="address", type="string", example="Danang, Vietnam"),
        *              @SWG\Property(property="code_id", type="string", example="admincode"),
        *              @SWG\Property(property="personal_photo", type="string", example="..."),
        *              @SWG\Property(property="gender", type="number", example=0),
        *              @SWG\Property(property="created_at", type="string", example="2000-12-03 12:20:20"),
        *              @SWG\Property(property="updated_at", type="string", example="2000-12-03 12:20:20"),
        *          ),
    *            @SWG\Property(property="created_at", type="string"),
    *            @SWG\Property(property="updated_at", type="string"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="NotFound Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     * )
     */
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
        $input = $this->request->all();

        $post = $this->postService->save(
            $req->title, 
            $req->content, 
            $req->photo_thumbnail, 
            $req->full_photo, 
            $req->due_day,
            $req->user()->id
        );

        if (!empty($input['hastags'])) {
            $this->postService->createAndAddHastag($post->id, $input['hastags']);
        }

        if (!empty($input['offer']) && !empty($input['offer']['type'])) {
            if ($input['offer']['type'] == 'time' && !empty($input['offer']['time'])) {
                $post->update([
                    
                ]);
                $this->postService->saveOfferTime($post->id, $input['offer']['time']);
            }
            if ($input['offer']['type'] == 'goods' && !empty($input['offer']['value'])) {
                $this->postService->saveOfferGoods($post->id, $input['offer']['value']);
            }
        }

        $post->offers;
        $post->hastags;

       return response()->json(json_decode($post), 201);
    }

    /**
     * @SWG\Get(
     *     path="api/posts/{id}",
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
     *              @SWG\Property(property="id", type="number", example=1),
     *              @SWG\Property(property="user_id", type="number", example=1),
     *              @SWG\Property(property="title", type="string", example="First Project"),
     *              @SWG\Property(property="content", type="string", example="Hello World"),
     *              @SWG\Property(property="photo_thumbnail", type="string", example="..."),
     *              @SWG\Property(property="full_photo", type="string", example="..."),
     *              @SWG\Property(property="due_day", type="string", example="2000-12-03 12:20:20"),
     *              @SWG\Property(property="status", type="number", example=0   ),
     *              @SWG\Property(property="user", type="object",
        *              @SWG\Property(property="id", type="number", example=1),
        *              @SWG\Property(property="first_name", type="string", example="admin"),
        *              @SWG\Property(property="last_name", type="string", example="admin"),
        *              @SWG\Property(property="username", type="string", example="admin"),
        *              @SWG\Property(property="email", type="string", example="admin@gmail.com"),
        *              @SWG\Property(property="address", type="string", example="Danang, Vietnam"),
        *              @SWG\Property(property="code_id", type="string", example="admincode"),
        *              @SWG\Property(property="personal_photo", type="string", example="..."),
        *              @SWG\Property(property="gender", type="number", example=0),
        *              @SWG\Property(property="created_at", type="string", example="2000-12-03 12:20:20"),
        *              @SWG\Property(property="updated_at", type="string", example="2000-12-03 12:20:20"),
        *          ),
    *            @SWG\Property(property="created_at", type="string"),
    *            @SWG\Property(property="updated_at", type="string"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="NotFound Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
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
        $post->likes;
        $post->offers;
        return response()->json(json_decode($post), 200);
    }

    /**
     * @SWG\Put(
     *     path="api/posts/{id}",
     *     tags={"Posts"},
     *     summary={"Update Post"},
     *     description="Return post detail by Id",  
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         type="integer",
     *         description="Length of record need to response",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="title",
     *         in="formData",
     *         type="string",
     *         description="Title Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="content",
     *         in="formData",
     *         type="string",
     *         description="Content Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="photo_thumbnail",
     *         in="formData",
     *         type="string",
     *         description="Photo thumbnail Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="full_photo",
     *         in="formData",
     *         type="string",
     *         description="Full photo Post",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="due_day",
     *         in="formData",
     *         type="string",
     *         description="Due day Post",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *              @SWG\Property(property="id", type="number", example=1),
     *              @SWG\Property(property="user_id", type="number", example=1),
     *              @SWG\Property(property="title", type="string", example="First Project"),
     *              @SWG\Property(property="content", type="string", example="Hello World"),
     *              @SWG\Property(property="photo_thumbnail", type="string", example="..."),
     *              @SWG\Property(property="full_photo", type="string", example="..."),
     *              @SWG\Property(property="due_day", type="string", example="2000-12-03 12:20:20"),
     *              @SWG\Property(property="status", type="number", example=0   ),
     *              @SWG\Property(property="user", type="object",
        *              @SWG\Property(property="id", type="number", example=1),
        *              @SWG\Property(property="first_name", type="string", example="admin"),
        *              @SWG\Property(property="last_name", type="string", example="admin"),
        *              @SWG\Property(property="username", type="string", example="admin"),
        *              @SWG\Property(property="email", type="string", example="admin@gmail.com"),
        *              @SWG\Property(property="address", type="string", example="Danang, Vietnam"),
        *              @SWG\Property(property="code_id", type="string", example="admincode"),
        *              @SWG\Property(property="personal_photo", type="string", example="..."),
        *              @SWG\Property(property="gender", type="number", example=0),
        *              @SWG\Property(property="created_at", type="string", example="2000-12-03 12:20:20"),
        *              @SWG\Property(property="updated_at", type="string", example="2000-12-03 12:20:20"),
        *          ),
    *            @SWG\Property(property="created_at", type="string"),
    *            @SWG\Property(property="updated_at", type="string"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="NotFound Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     * )
     */
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
     * @SWG\Delete(
     *     path="api/posts/{id}",
     *     tags={"Posts"},
     *     summary={"Delete Post"},
     *     description="Delete post by Id",  
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
    *            @SWG\Property(property="message", type="string", example="success"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Not Found Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     *     @SWG\Response(
     *         response=403,
     *         description="FORBIDDEN",
     *     )
     * )
     */
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

    /**
     * @SWG\Post(
     *     path="api/posts/photo",
     *     tags={"Posts"},
     *     summary={"Tải lên hình ảnh"},
     *     description="Tải lên hình ảnh cho bài post",  
     *     @SWG\Parameter(
     *         name="photo",
     *         in="path",
     *         type="file",
     *         description="File ảnh",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="message", type="string", example="success"),
    *            @SWG\Property(property="image_directory", type="string", example="/upload/image/photo/example.jpg"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Not Found Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     *     @SWG\Response(
     *         response=403,
     *         description="FORBIDDEN",
     *     )
     * )
     */
    public function storePhoto(Request $request)
    {
        $request->validate([
            'photo' =>'required|image|mimes:jpeg,png,jpg,gif,svg|max:20480',
        ]);
        $path =  $this->postService->saveImage($request->file('photo'));
        return response()->json([
            'messeger' => 'success',
            'image_directory' => $path,
        ], 201);
    }

    /**
     * @SWG\Get(
     *     path="api/photo",
     *     tags={"Posts"},
     *     summary={"Tải về hình ảnh"},
     *     description="Tải về hình ảnh cho bài post",  
     *     @SWG\Parameter(
     *         name="dir",
     *         in="path",
     *         type="string",
     *         description="đường dẫn ảnh",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            
     *          )
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Not Found Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     *     @SWG\Response(
     *         response=403,
     *         description="FORBIDDEN",
     *     )
     * )
     */
    public function showPhoto(Request $request)
    {
        return $this->commonService->showImage($request->get('dir'));        
    }
    
    /**
     * @SWG\Get(
     *     path="api/posts/comments",
     *     tags={"Posts"},
     *     summary={"Comment Post"},
     *     description="Tất cả comment của post",  
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         type="string",
     *         description="Id post",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Property(type="array",
    *            @SWG\Items(
 *                    @SWG\Property(property="id", type="string"),
 *                    @SWG\Property(property="post_id", type="string"),
 *                    @SWG\Property(property="user_id", type="string"),
 *                    @SWG\Property(property="content", type="string"),
 *                    @SWG\Property(property="created_at", type="string"),
 *                    @SWG\Property(property="updated_at", type="string"),
 *                    @SWG\Property(property="user", type="object",
                    *              @SWG\Property(property="id", type="number", example=1),
                    *              @SWG\Property(property="first_name", type="string", example="admin"),
                    *              @SWG\Property(property="last_name", type="string", example="admin"),
                    *              @SWG\Property(property="username", type="string", example="admin"),
                    *              @SWG\Property(property="email", type="string", example="admin@gmail.com"),
                    *              @SWG\Property(property="address", type="string", example="Danang, Vietnam"),
                    *              @SWG\Property(property="code_id", type="string", example="admincode"),
                    *              @SWG\Property(property="personal_photo", type="string", example="..."),
                    *              @SWG\Property(property="gender", type="number", example=0),
                    *              @SWG\Property(property="created_at", type="string", example="2000-12-03 12:20:20"),
                    *              @SWG\Property(property="updated_at", type="string", example="2000-12-03 12:20:20"),
                    *),
    *               ),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Not Found Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     *     @SWG\Response(
     *         response=403,
     *         description="FORBIDDEN",
     *     )
     * )
     */
    public function getComments(Request $request, $id)
    {
        $comments = \App\Models\Comment::where('post_id', $id)->get();
        foreach ($comments as $key => $comment) {
            $comment->user;
        }
        return $comments;
    }

}