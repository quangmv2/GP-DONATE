<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Module;
use App\Models\Page;

class PageController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('permission:post-list|post-create|post-edit|post-delete', ['only' => ['index','show']]);
		$this->middleware('permission:post-create', ['only' => ['create','store']]);
		$this->middleware('permission:post-edit', ['only' => ['edit','update']]);
		$this->middleware('permission:post-delete', ['only' => ['destroy']]);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $pageName = $request->input('page_name');

        $current_page = Page::where('name', $pageName)->first();
        return view('pages.index', compact('current_page'));
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);
        $pageName = $request->input('name');
        $page = Page::where('name', $pageName)->first();
        if(!$page){
            $page = new Page;
        }
        
        $page->name = $request->input('name');
        $page->content = $request->input('pages');
        $page->type = "mobile";
        $page->save();
        return redirect()->route('pages.index', ['page_name'=>$pageName])
                        ->with('success','Update page settings successfully');
    }
}
