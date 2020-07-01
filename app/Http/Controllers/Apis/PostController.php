<?php


namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;
use App\Services\CommonService;


class PostController extends Controller
{ 
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
       
        $order = $request->input('order')? $request->input('order') : 'created_at';
        $length = $request->input('length');
        $start = $request->input('start');
        $search = $request->input('search');
        $orderDesc = $request->input('order_type') ? $request->input('order_type') : 'desc';
        $searchCategory = $request->input('category');

        $length = isset($length) && $length > 0 ? $length : 10;
        $page = isset($start) ? ($start/$length + 1) : 1;

        $categories = Post::whereIn('status',[0,1])
            ->where('id', constants('id.post'))
            ->where(function($request) use ($search){
            $request->where('title', 'like', '%'.$search.'%')
            ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;

        $query = Post::whereIn('status', [0, 1])
            ->where('post_type', constants('post_type.post'))
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;

        $query = $query->with("categories");
        if (!(!$searchCategory || $searchCategory == "" || $searchCategory == "all")) 
        {
            $query = $query
            ->whereHas('categories', function($q) use ($searchCategory) 
            {
                $q->where('categories.id', '=', $searchCategory);
            });
        }

        $totalSearch = $query->count();
        $data = $query->orderBy($order, $orderDesc)->paginate($length, ['*'], 'page', $page);
        $data = CommonService::filterArray($data);

        return Response::json([
            'recordsFiltered' => $totalSearch,
            'recordsTotal' => $totalSearch,
            'data' => $data->data,
        ]);
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
    public function store(Request $request)
    {
        $request->validate([
            'title' =>'required',
            'content' =>'required',  
            'hashtags' =>'required',
            'user_id' =>'required',
        ]);

        $image = $request->file('image');

        $input['imagename'] = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('/images');
        $image->move($destinationPath, $input['imagename']);

        $post = new Post();
     
        $post->title = $request->title;
        $post->content = $request->content;

        $post->hashtags = $request->hashtags;
        $post->user_id = $request->user_id;
        $post->save();

       return reponse()->json($post);
    }


    /**
     * GET route  {id_post}
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response()->json(Post::FindOrFail($id));
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
    public function update(Request $request, Post $post)
    {
        $validatedData = $request->validate([
            'title' =>'required',
            'content' =>'required',
            'photo_thumbnail' =>'required',
            'full_photo' =>'required',
            'hashtags' =>'required',
            'useruser_id' =>'required',
        ]);
        $post = Post::findOrFail($id);
        $post->title = $request->title;
        $post->content = $request->content;
        $post->photo_thumbnail = $request->photo_thumbnail;
        $post->full_photo = $request->full_photo;
        $post->user()->id = $request->user()->id;
        $post->save();

        return reponse()->json($post);
    }


    /**
     * DELETE route {id_posts}
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return reponse()->json($post);
    }


    public function storePhoto(Request $request)
    {
        $request->validate([
            'photo_thumbnail' =>'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'full_photo' =>'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]); 
        $image = $request->file('image');
        $input['imagename'] = time().'.'.$image->getClientOriginalExtension();
        $destinationPath = public_path('/images');
        $image->move($destinationPath, $input['imagename']);
        $post = new Post();
        $post->photo_thumbnail = $request->photo_thumbnail;
        $post->full_photo = $request->full_photo;

        return response()->json(['messeger' => 'success'], 201);
    }

    public function uploadForm(Request $request)
    {
        $post = new Post();
        $post->photo_thumbnail = $input['imagename'];
        $post->full_photo = $input['imagename'];

        return response()->json(['messeger'=> $post], 200);
    }
    
}