<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\CommentService;
use App\Events\CommentEvent;

class CommentController extends Controller
{

    private CommentService $commentService;

    function __construct(CommentService $commentService){
        $this->commentService = $commentService;
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
        $this->commentService->validate($request);
        $comment = $this->commentService->save($request->post_id, $request->user()->id, $request->content);
        $comment->user;
        $comment->post;
        event(
            new CommentEvent('new-comment', $comment)
        );
        return $comment;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
        $this->commentService->validateUpdate($request);
        $comment = $this->update($id, $request->user()->id, [
            'content' => $request->content
        ]);
        $comment->user;
        event(
            new CommentEvent('update-comment', $comment)
        );
        return $comment;
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        
        $comment = $this->commentService->delete($id, $request->user()->id);
        $comment->user;
        $id = $comment->id;
        $post_id = $comment->post_id;
        event(
            new CommentEvent('delete-comment', ['id' => $id, 'post_id' => $post_id])
        );
        return $comment;
    }
}
