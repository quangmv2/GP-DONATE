<?php


namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\Category;
use App\Models\Event;
use Illuminate\Http\Request;
use DB;
use Response;


class EventController extends Controller
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
        return view('events.index');
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
        $filterdate = $request->input('filterdate');
        $searchStatus = $request->input('searchByStatus');

        $orderColumn = isset($order) ? $columns[$order[0]['column']]['data'] : 'updated_at';
        $orderDesc = isset($order) ? $order[0]['dir'] : 'desc';
        $length = isset($length) && $length > 0 ? $length : 10;
        $page = isset($start) ? ($start/$length + 1) : 1;
        $search = isset($search) ? $search['value'] : '';

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
        $query = Event::whereIn('status',  $valueSearchStatus);

        if(trim($filterdate) != ""){
            
        	$filter_date_converted = \DateTime::createFromFormat('d/m/Y', trim($filterdate))->format('Y-m-d');

        	$query = $query->where('start_date', '<=', $filter_date_converted);
        	$query = $query->where('end_date', '>=', $filter_date_converted);
        }

        $query =  $query->where(function($q) use ($search){
                $q->where('name', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;
            
            //->orWhere('author', 'like', '%'.$search.'%');

        $totalSearch = $query->count();
        $data = $query->orderBy($orderColumn, $orderDesc)
        		->select("id", "name", "status", DB::raw('DATE_FORMAT(start_date, "%d/%m/%Y") as start_date'), DB::raw('DATE_FORMAT(end_date, "%d/%m/%Y") as end_date') )
        		->paginate($length, ['*'], 'page', $page);

        return Response::json([
            'recordsFiltered' => $totalSearch,
            'recordsTotal' => $totalSearch,
            'data' => $data->toArray()['data'],
        ]);
    }

    public function summary(Request $request){

    	$year = $request->input('year') ? $request->input('year') : date("Y");
        $month = $request->input('month') ? $request->input('month') : date("m");
        $data = [];

    	$sql = "SELECT Date(dts.day) AS month_date,
       		count(s.id) as summary
			FROM
			  (SELECT '$year-$month-01' + INTERVAL t.n - 1 DAY DAY
			   FROM
			     (SELECT a.n + b.n * 10 + 1 n
			      FROM
			        (SELECT 0 AS N
			         UNION ALL SELECT 1
			         UNION ALL SELECT 2
			         UNION ALL SELECT 3
			         UNION ALL SELECT 4
			         UNION ALL SELECT 5
			         UNION ALL SELECT 6
			         UNION ALL SELECT 7
			         UNION ALL SELECT 8
			         UNION ALL SELECT 9) a,

			        (SELECT 0 AS N
			         UNION ALL SELECT 1
			         UNION ALL SELECT 2
			         UNION ALL SELECT 3
			         UNION ALL SELECT 4
			         UNION ALL SELECT 5
			         UNION ALL SELECT 6
			         UNION ALL SELECT 7
			         UNION ALL SELECT 8
			         UNION ALL SELECT 9) b
			      ORDER  BY n) t
			   WHERE t.n <= Datediff(Last_day('$year-$month-01'), '$year-$month-01') + 1) dts
			LEFT OUTER JOIN events s ON Date(s.start_date) <= Date(dts.day)
			AND Date(s.end_date) >= Date(dts.day)
			WHERE s.status = 1
			GROUP BY month_date";

		$data = DB::select($sql);
		return Response::json([
            'data' => $data,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('events.create');
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
            'name' => 'required',
            'content' => 'required',
        ]);

    	$array_date = array();
    	$start_date = "";
    	$end_date = "";

        $start_end_date = $request->input('start_end_date');
        $array_date = explode("-", $start_end_date); 
        $start_date = count($array_date) > 0 ? \DateTime::createFromFormat('d/m/Y', trim($array_date[0]))->format('Y-m-d') : "";
        $end_date = count($array_date) > 0 ? \DateTime::createFromFormat('d/m/Y', trim($array_date[1]))->format('Y-m-d') : ""; 

        $event = new Event;
        $event->name = $request->name;
        $event->status = $request->status;
        $event->description = $request->description;
        $event->content = $request->content;
        $event->feature_image = $request->feature_image;
        if(count($array_date) > 0){
        	$event->start_date = $start_date;
    		$event->end_date = $end_date;
        }
        
        $event->save();


        return redirect()->route('events.index')
                        ->with('success','Event created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return view('events.detail',compact('post'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        return view('events.edit', compact('event'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {

         request()->validate([
            'name' => 'required',
            'content' => 'required',
        ]);
        

        $array_date = array();
        $start_date = "";
        $end_date = "";

        $start_end_date = $request->input('start_end_date');
        $array_date = explode("-", $start_end_date); 
        $start_date = count($array_date) > 0 ? \DateTime::createFromFormat('d/m/Y', trim($array_date[0]))->format('Y-m-d') : "";
        $end_date = count($array_date) > 0 ? \DateTime::createFromFormat('d/m/Y', trim($array_date[1]))->format('Y-m-d') : ""; 

        $event->name = $request->name;
        $event->status = $request->status;
        $event->description = $request->description;
        $event->content = $request->content;
        $event->feature_image = $request->feature_image;
        if(count($array_date) > 0){
            $event->start_date = $start_date;
            $event->end_date = $end_date;
        }

        $event->save();

        return redirect()->route('events.index')
                        ->with('success','Event updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        // $event->delete();
        $event->status = -1;
        $event->save();
        return redirect()->route('events.index')
                        ->with('success','Event deleted successfully');
    }
}