<?php


namespace App\Http\Controllers;


use App\Models\Module;
use App\Models\Menu;
use Illuminate\Http\Request;
use DB;
use Response;


class MenuController extends Controller
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
        $modules = Module::where('type', 'menu')->orderBy('id','DESC')->paginate(5);
        return view('menus.index',compact('modules'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('menus.create');
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
        $module->type = 'menu';
        $module->user()->associate($request->user());
        $module->save();

        if(trim($request->input('menus')) != ""){
        	$menu = new Menu;
        	$menu->module_id =  $module->id;
        	$menu->content = $request->input('menus');
        	$menu->save();
        }
        return redirect()->route('menus.edit', $module->id)
                        ->with('success','Menu created successfully');
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

        return view('menus.detail',compact('module'));
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
        $menu = Menu::where('module_id', $id)->first();

        return view('menus.edit',compact('module', 'menu'));
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


        $module = Module::find($id);
        $module->name = $request->input('name');
        $module->save();

        $menu = Menu::where('module_id', $id)->first();
        if(!$menu){
        	$menu = new Menu;
        	$menu->module_id =  $id;
        }
        $menu->content = $request->input('menus');
        $menu->save();

        return redirect()->route('menus.index')
                        ->with('success','Menu updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table("modules")->where('id',$id)->delete();
        DB::table("menus")->where('module_id',$id)->delete();
        return redirect()->route('menus.index')
                        ->with('success','Menu deleted successfully');
    }
}