<?php


namespace App\Http\Controllers;


use App\Models\Post;
use App\Models\Category;
use Illuminate\Http\Request;
use DB;
use Response;


class BookChapterController extends Controller
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
        return redirect()->route('books.index');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $book_id = $request->input('book_id');

        if(!$book_id){
        	return redirect()->route('books.index');
        }

        $book = Post::find($book_id);
        if(!$book){
        	return redirect()->route('books.index');
        }

        return view('dashboard.books.chapters.create', compact('book'));
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
            'content' => 'required',
        ]);

        $book_parent = Post::find($request->parent_id);
        if(!$book_parent){
        	return redirect()->route('books.index');
        }

        $chapters_count = Post::where('parent_id', $request->parent_id)->count();

        $book = new Post;
        $book->parent_id = $request->parent_id;
        $book->title = $request->title;
        $book->slug = $book_parent->slug.'-'.str_slug($request->title, "-");
        $book->status = $request->status;
        $book->description = $request->description;
        $book->content = $request->content;
        $book->feature_image = $request->feature_image;
        $book->post_type = constants('post_type.book');
        $book->post_order = $chapters_count+1;
        $book->user()->associate($request->user());
        $book->save();

        return redirect()->route('books.edit', $request->parent_id)
                        ->with('success','Book Chapter created successfully.');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $book)
    {
        return view('dashboard.books.detail',compact('book'));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $chapter = Post::find($id);
        if(!$chapter){
        	return redirect()->route('books.index');
        }
        $book = Post::find($chapter->parent_id);
        return view('dashboard.books.chapters.edit',compact('chapter', 'book'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {

         request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);
     	$book = Post::find($id);
     	$book_parent = Post::find($book->parent_id);

        $book->update($request->all());
        $book->update(['slug' => $book_parent->slug.'-'.str_slug($book->title)]);
        $book->save();

        return redirect()->route('dashboard.books.edit', $book->parent_id)
                        ->with('success','Book Chapter updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    	$book = Post::find($id);
        $book->status = "-1";
        $book->save();
        // $book->delete();

        return redirect()->route('books.index')
                        ->with('success','Book Chapter deleted successfully');
    }
}