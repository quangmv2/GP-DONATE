<?php


namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;
use App\Services\CommonService;


class BookController extends Controller
{ 
    /**
     * @SWG\Get(
     *     path="/api/books",
     *     tags={"Books"},
     *     summary={"Books list"},
     *     description="Return audio list",
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
     *         name="searcg",
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
        
        $query = Post::whereIn('status', [0, 1])
            ->where('post_type', constants('post_type.book'))
            ->whereNull('parent_id')
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;
        $query = $query->with("categories");
        $query = $query->withCount('children');
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
     *     path="/api/books/{id}",
     *     tags={"Books"},
     *     summary={"Book detail"},
     *     description="Return book detail by Id, include chapters",  
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

        $data = Post::where('id', $id)->whereIn('status', [1])
                    ->where('post_type', constants('post_type.book'))
                    ->whereNull('parent_id')
                    ->with('categories')
                    ->with(['children' => function($query){
                        $query->where('status', 1)
                            ->select('id','title', 'description', 'feature_image', 'parent_id')
                        ;
                    }])
                    ->first();

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
        $data = CommonService::filterArray($data);
        $data->related = $postRelated;
        return Response::json([
            'data' => $data,
        ]);
    }

    /**
     * @SWG\Get(
     *     path="/api/books-chapter/{id}",
     *     tags={"Books"},
     *     summary={"Book Chapter detail"},
     *     description="Return book detail by Id, include chapters",  
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
    public function detailChapter($id){

        $data = Post::where('id', $id)->whereIn('status', [1])
                    ->where('post_type', constants('post_type.book'))
                    ->whereNotNull('parent_id')
                    ->with('categories')
                    ->with(['parent' => function($query){
                        $query->where('status', 1)
                            ->select('id','title', 'description', 'feature_image', 'parent_id')
                        ;
                    }])
                    ->first();
        $data = CommonService::filterArray($data);
        return Response::json([
            'data' => $data,
        ]);
    }
}