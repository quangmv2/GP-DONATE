<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;

use App\Models\Follow;
use App\Services\UserService;

class FollowService
{
    
    protected $userService;
    
    function __construct(UserService $userService, NotificationService $notificationService){
        $this->userService = $userService;
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

    public function getFollowingOfUser($id)
    {
        $user = $this->userService->getUserById($id);
        return $user->following;
    }

    public function getFollowedOfUser($id)
    {
        $user = $this->userService->getUserById($id);
        return $user->followed;
    }

    public function userFollowUser($from, $to)
    {
        $to = $this->userService->getUserByIdOrUsername($to)->id;
        $follow = Follow::updateOrCreate([
            'user_id_from' => $from,
            'user_id_to' => $to
        ], []);
        $this->notificationService->saveFollow($from, $to);
        return $follow;
    }

    public function userUnfollowUser($from, $to)
    {
        $to = $this->userService->getUserByIdOrUsername($to)->id;
        $follow = Follow::where('user_id_from', $from)
                        ->where('user_id_to', $to)->first();
        if (empty($follow)) return abort(response()->json(['message' => 'NotFound'], 404));
        $follow->delete();
        return $follow;
    }

    public function checkFollowUser($from, $to)
    {
        $to = $this->userService->getUserByIdOrUsername($to)->id;
        $follow = Follow::where('user_id_from', $from)
                    ->where('user_id_to', $to)->first();
        if (empty($follow)) return false;
        return true;
    }

}