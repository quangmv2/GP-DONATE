<?php


namespace App\Http\Controllers;


use App\Models\Module;
use App\Models\AppImage;
use Illuminate\Http\Request;
use DB;
use Response;


class AppImageController extends Controller
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
    public function index(Request $request)
    {
        return view('dashboard.app-images.index');
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

        $orderColumn = isset($order) ? $columns[$order[0]['column']]['data'] : 'id';
        $orderDesc = isset($order) ? $order[0]['dir'] : 'desc';
        $length = isset($length) && $length > 0 ? $length : 10;
        $page = isset($start) ? ($start/$length + 1) : 1;
        $search = isset($search) ? $search['value'] : '';

        $valueSearchStatus = [0,1];
        {
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
                    $valueSearchStatus = [0,1];
                    break;
            }
        }

        $query = AppImage::whereIn('status', $valueSearchStatus)
            ->where(function($q) use ($search){
                $q->where('title', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%');
                })
            ;
            
          

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
        return view('dashboard.app-images.create');
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
        ]);

        $image = new AppImage;
        $image->description = $request->description;
        $image->status = $request->status;
        $image->title = $request->title;
        $image->feature_image = $request->feature_image;

        $image->save();

        return redirect()->route('app-images.index')
                        ->with('success','Image created successfully');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $image = AppImage::find($id);

        return view('dashboard.app-images.detail',compact('image'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $image = AppImage::find($id);
        return view('dashboard.app-images.edit',compact('image'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'title' => 'required',
        ]);


        $image = AppImage::find($id);
        $image->title = $request->input('title');
        $image->description = $request->input('description');
        $image->feature_image = $request->input('feature_image');
        $image->status = $request->input('status');
        $image->save();

        return redirect()->route('app-images.index')
                        ->with('success','Image updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("app_images")->where('id',$id)->update(['status'=> -1]);
        return redirect()->route('app-images.index')
                        ->with('success','Image deleted successfully');
    }
}