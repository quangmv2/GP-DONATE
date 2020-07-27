<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;

use App\Models\User;
use App\Models\Like;

class UserService
{
    
    public function validate($request)
    {
        $request->validate([
            'post_id' =>'required|exists:posts,id',
        ]);
    }

    public function save($post_id, $user_id)
    {
    }

    public function update($id, $user_id, $update)
    {
       
    }

    public function delete($id, $user_id)
    {
    }

    public function getLikeOfPost($post_id)
    {
    }

    public function getUserById($id)
    {
        $user = User::findOrFail($id);
        return $user;
    }

    public function getUserByIdOrUsername($id)
    {
        $user = User::where('id', $id)->orWhere('username', $id)->first();
        return $user;
    }

    

    public function searchUser($search)
    {
        $user = User::where('first_name', 'like', '%'.$search.'%')
                    ->orWhere('last_name', 'like', '%'.$search.'%')
                    ->orWhere('username', 'like', '%'.$search.'%')
                    ->get();
        return $user;
    }

    public function getMyLikes($user_id)
    {
        $likes = Like::where('user_id', $user_id)->get();
        foreach ($likes as $key => $like) {
            $like->post->offers;
            $like->post->user;
            $like->post->hastags;
        }
        return $likes;
    }

}