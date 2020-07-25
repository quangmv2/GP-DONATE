<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;

use App\Services\NotificationService;
use App\Models\Comment;
use App\Models\Post;


class CommentService
{
    
    function __construct(NotificationService $notificationService){
        $this->notificationService = $notificationService;
    }

    public function validate($request)
    {
        $request->validate([
            'post_id' =>'required|exists:posts,id',
            'content' =>'required',  
        ]);
    }

    public function validateUpdate($request)
    {
        $request->validate([
            'content' =>'required',  
        ]);
    }

    public function save($post_id, $user_id, $content)
    {
        $comment = Comment::create([
            'post_id' => $post_id,
            'user_id' => $user_id,
            'content' => $content
        ]);
        $post = Post::find($post_id);
        $this->notificationService->saveComment($user_id, $post->user_id, $post_id, $content, $post->photo_thumbnail);
        return $comment;
    }

    public function update($id, $user_id, $update)
    {
        $comment = Comment::findOrFail($id);
        if ($comment->user_id != $user_id)  
            return abort(response()->json(['message' => 'FORBIDDEN'], 403));
        $comment->update($update);
        $comment = Comment::findOrFail($id);
        return $comment;
    }

    public function delete($id, $user_id)
    {
        $comment = Comment::findOrFail($id);
        if ($comment->user_id != $user_id)  
            return abort(response()->json(['message' => 'FORBIDDEN'], 403));
        $comment->delete();
        return $comment;
    }

}