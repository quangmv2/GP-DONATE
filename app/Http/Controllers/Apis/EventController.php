<?php


namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;
use DB;
use Response;
use App\Services\CommonService;


class EventController extends Controller
{ 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    /**
     * @SWG\Get(
     *     path="/api/events",
     *     tags={"Events"},
     *     summary={"Events list"},
     *     description="Returnlist event",
     *     @SWG\Parameter(
     *         name="d",
     *         in="query",
     *         type="string",
     *         description="Date",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="m",
     *         in="query",
     *         type="string",
     *         description="Month",
     *         required=false,
     *     ),
     *		@SWG\Parameter(
     *         name="y",
     *         in="query",
     *         type="string",
     *         description="Year",
     *         required=false,
     *     ),
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
    	$date = $request->input('d') ? $request->input('d') : "";
        $month = $request->input('m') ? $request->input('m') : date("m");
        $year = $request->input('y') ? $request->input('y') : date("Y");


		$query = Event::whereIn('status', [1]);

		if( $date != "") {
			$query = $query->whereYear('start_date', $year);
			$query = $query->whereMonth('start_date', $month);
	 		$query = $query->whereDay('start_date', $date);
		}else{
			$query = $query->where(function($q) use ($year, $month){
                $q->whereYear('start_date', $year)
                    ->whereMonth('start_date', $month);
                });

			$query = $query->orWhere(function($q) use ($year, $month){
                $q->whereYear('end_date', $year)
                    ->whereMonth('end_date', $month);
                });
		}

		$totalSearch = $query->count();
		$data = $query->select("events.*", 
                                DB::raw("DATE_FORMAT(events.start_date, '%d-%m-%Y') as start_date"), 
                                DB::raw("DATE_FORMAT(events.end_date, '%d-%m-%Y') as end_date"))->get();

        $data = CommonService::filterArray($data);

		return Response::json([
            'recordsFiltered' => $totalSearch,
            'recordsTotal' => $totalSearch,
            'data' => $data,
        ]);


    }

    /**
     * @SWG\Get(
     *     path="/api/events/{id}",
     *     tags={"Events"},
     *     summary={"Event detail"},
     *     description="Return event detail by Id",  
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

        $event = Event::where('id', $id)->whereIn('status', [1])->first();
        $data = CommonService::filterArray($event);
        return Response::json([
            'data' => $data ? $data : [],
        ]);
    }
}