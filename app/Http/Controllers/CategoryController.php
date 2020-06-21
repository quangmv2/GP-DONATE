<?php


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use DB;


class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    function __construct()
    {
         $this->middleware('permission:role-list|role-create|role-edit|role-delete', ['only' => ['index','store']]);
         $this->middleware('permission:role-create', ['only' => ['create','store']]);
         $this->middleware('permission:role-edit', ['only' => ['edit','update']]);
         $this->middleware('permission:role-delete', ['only' => ['destroy']]);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $categories = Category::orderBy('id','DESC') ->where('status', 1);

        if ($request->is('categories-audios')) {
            $categories = $categories->where('type', constants('post_type.audio'));
        }
        else if ($request->is('categories-books')){
            $categories = $categories->where('type', constants('post_type.book'));
        }else{
            $categories = $categories->whereNull('type')->orWhere('type', constants('post_type.post'));
        }

        $categories = $categories->paginate(5);
        return view('dashboard.categories.posts.index',compact('categories'))
            ->with('i', ($request->input('page', 1) - 1) * 5);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('dashboard.categories.posts.create');
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
            'name' => 'required|unique:categories,name',
        ]);


        $categories = Category::create([
        	'name' => $request->input('name'),
        	'slug' => str_slug($request->input('name'), "-"),
        	'description' => $request->input('description'),
        	'feature_image' => $request->input('feature_image'),
            'parent_id' => $request->input('parent_id'),
            'type' => $request->input('type'),
        	'user_id' => $request->user()->id
		]);

        $redirectView = 'categories.index';
        if ($request->is('categories-audios')) {
            $redirectView = 'categories-audios.index';
        }

        if ($request->is('categories-books')) {
            $redirectView = 'categories-books.index';
        }

        return redirect()->route($redirectView)
                        ->with('success','Category created successfully');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);;


        return view('dashboard.categories.posts.detail',compact('category'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Category::find($id);;

        return view('dashboard.categories.posts.edit',compact('category'));
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


        $category = Category::find($id);
        $category->name =  $request->input('name');
        $category->slug =  str_slug($request->input('name'), "-");
        $category->description = $request->input('description');
        $category->feature_image = $request->input('feature_image');
        $category->parent_id = $request->input('parent_id');
        $category->type = $request->input('type');
        $category->save();

        $redirectView = 'categories.index';
        if ($request->is('categories-audios/*')) {
            $redirectView = 'categories-audios.index';
        }

        if ($request->is('categories-books/*')) {
            $redirectView = 'categories-books.index';
        }

        return redirect()->route($redirectView)
                        ->with('success','Category updated successfully');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        $redirectView = 'categories.index';
        if ($request->is('categories-audios/*')) {
            $redirectView = 'categories-audios.index';
        }
        if ($request->is('categories-books/*')) {
            $redirectView = 'categories-books.index';
        }
        DB::table("categories")->where('id',$id)->update(['status' => -1]);
        return redirect()->route($redirectView)
                        ->with('success','Category deleted successfully');
    }
}