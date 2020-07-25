<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;

use App\Models\Like;
use App\Models\Post;
use App\Services\NotificationService;



class LikeService
{
    
    function __construct(NotificationService $notificationService){
        $this->notificationService = $notificationService;
    }

    public function validate($request)
    {
        $request->validate([
            'post_id' =>'required|exists:posts,id',
        ]);
    }

    public function save($post_id, $user_id)
    {
        $like = Like::where('post_id', $post_id)
                    ->where('user_id', $user_id)
                    ->first();
        // return $like;
        if (!empty($like) && $like->user_id == $user_id) {
            $like->delete();
            $like["status"] = 1;
            $like["message"] = 'UnLike sucess';
            return $like;
        }
        $like = Like::updateOrCreate([
            'user_id' => $user_id,
            'post_id' => $post_id
        ], []);
        $like["status"] = 1;
        $like["message"] = 'Like sucess';
        $post = Post::find($post_id);
        $this->notificationService->saveLike($user_id, $post->user_id, $post_id);
        return $like;
    }

    public function update($id, $user_id, $update)
    {
       
    }

    public function delete($id, $user_id)
    {
        $like = Like::findOrFail($id);
        if ($like->user_id != $user_id)  
            return abort(response()->json(['message' => 'FORBIDDEN'], 403));
        $like->delete();
        return $like;
    }

    public function getLikeOfPost($post_id)
    {
        $likes = Like::where('post_id', $post_id)->get();
        foreach ($likes as $key => $like) {
            $like->user;
        }
        return $likes;
    }

    // public function getMyLike($user_id)
    // {
    //     $likes = Like::where('user', $post_id)->get();
    // }

}