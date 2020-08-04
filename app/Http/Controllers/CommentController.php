<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Response;

use App\Services\PostService;
use App\Models\Comment;
use App\Events\CommentEvent;


class CommentController extends Controller
{

    function __construct(PostService $postService)
    {

        $this->postService = $postService;
    //      $this->middleware('permission:post-list|post-create|post-edit|post-delete', ['only' => ['index','show']]);
    //      $this->middleware('permission:post-create', ['only' => ['create','store']]);
    //      $this->middleware('permission:post-edit', ['only' => ['edit','update']]);
    //      $this->middleware('permission:post-delete', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $id = $request->get('q');

        $order = $request->input('order');
        $columns = $request->input('columns');
        $length = $request->input('length');
        $start = $request->input('start');
        $search = $request->input('search');
        $searchStatus = $request->input('searchByStatus');
        $searchCategory = $request->input('searchByCategory');

        $orderColumn = isset($order) ? $columns[$order[0]['column']]['data'] : 'id';
        $orderDesc = isset($order) ? $order[0]['dir'] : 'desc';
        $length = isset($length) && $length > 0 ? $length : 10;
        $page = isset($start) ? ($start/$length + 1) : 1;
        $search = isset($search) ? $search['value'] : '';

        //condtion to search by status
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
        // $query = ::->orWhere('content', 'like', '%'.$search.'%');
        $query = Comment::where('post_id', $id)->whereIn('status', $valueSearchStatus)
            ->where(function($q) use ($search){
                $q->where('content', 'like', '%'.$search.'%');
            });

        //fiter by category
        // //case 1 search by all
         $query = $query->with('user');

        //  //filter by condition

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
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = $this->postService->find($id);
        return view('dashboard.posts.comment', ['post' => $post]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Comment::find($id)->delete();
        return redirect()->back()
                        ->with('success','Comment deleted successfully');
    }

    public function hiddenComment($id)
    {
        $comment = Comment::find($id);
        $comment->update([
            'status' => 0
        ]);
        event(
            new CommentEvent('delete-comment', ['id' => $id, 'post_id' => $comment->post_id])
        );
        return redirect()->back()
                        ->with('success','Comment hidden successfully');
    }

    public function showComment($id)
    {
        Comment::find($id)->update([
            'status' => 1
        ]);
        return redirect()->back()
                        ->with('success','Comment showed successfully');
    }

}
