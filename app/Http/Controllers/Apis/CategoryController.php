<?php
namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;
use App\Services\CommonService;

class CategoryController extends Controller
{

    /**
     * @SWG\Get(
     *     path="/api/categories",
     *     tags={"Categories"},
     *     summary={"List Categories"},
     *     description="Return list categories",
     *     @SWG\Parameter(
     *         name="type",
     *         in="query",
     *         type="string",
     *         required=false,
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

	public function index(Request $request)
	{
    	$type = $request->input('type');
    	$search = $request->input('search');

        $data = [];

        if($type && $type != ""){
            $query = Category::where('type', $type)
                ->where(function($q) use ($search){
                    $q->where('name', 'like', '%'.$search.'%')
                        ->orWhere('description', 'like', '%'.$search.'%');
                    
                    });

            $data = $query->get();
        }

    	return Response::json([
            'data' => $data,
        ]);
	}
}

