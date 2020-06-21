<?php


namespace App\Http\Controllers;


use App\Models\Module;
use App\Models\Quote;
use Illuminate\Http\Request;
use DB;
use Response;


class QuoteSliderController extends Controller
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
        $modules = Module::where('type', 'quoteslider')->whereIn('status', [0,1])->orderBy('id','DESC')->paginate(5);
        return view('quoteslider.index',compact('modules'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {

        $quotes = Quote::all();
        return view('quoteslider.create',compact('quotes'));
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        $module = new Module;
        $module->name = $request->input('name');
        $module->type = 'quoteslider';
        
        $module->user()->associate($request->user());
        //sau lenh save ms co id
        $module->save();
       
        $quotes = $request->input('quotes');
        $quotes = json_decode($quotes);
        foreach ($quotes as $key => $quote) {
            $module->quotes()->attach($quote, ['quote_order' => $key]);
        }
        
        $module->save();

        return redirect()->route('quoteslider.index', $module->id)
                        ->with('success','Quote created successfully');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $module = Module::find($id);

        return view('quoteslider.detail',compact('module'));
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $module = Module::find($id);
        $quotes = Quote::all();
        return view('quoteslider.edit',compact('module','quotes'));
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
            'name' => 'required',
        ]);
        $quotes = $request->input('quotes');
        //convert json string to object
        $quotes = json_decode($quotes);
        $module = Module::find($id);
        $module->name = $request->input('name');
        DB::table("module_quote")->where('module_id',$id)->delete();
        foreach ($quotes as $key => $quote) {
            $module->quotes()->attach($quote, ['quote_order' => $key]);
        }
        $module->save();

        return redirect()->route('quoteslider.index')
                        ->with('success','Quote updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        DB::table("modules")->where('id',$id)->update(['status'=> -1]);
        return redirect()->route('quoteslider.index')
                        ->with('success','Menu deleted successfully');
    }
}