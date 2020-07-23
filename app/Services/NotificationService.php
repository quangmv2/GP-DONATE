<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;

use App\Models\Notification;

class NotificationService
{
    
    public function saveLike($user_id, $user_to_notify, $post_id)
    {
        if ($user_id == $user_to_notify) return;
        $data = [
            "post_id" => $post_id
        ];
        Notification::create([
            "user_id" => $user_id,
            "user_to_notify" => $user_to_notify,
            "data" => json_encode($data),
            "type" => "like",
        ]);
    }

    public function deleteLike($user_id, $user_to_notify, $post_id)
    {
        # code...
    }

    public function saveComment($user_id, $user_to_notify, $post_id, $content)
    {
        if ($user_id == $user_to_notify) return;
        $data = [
            "post_id" => $post_id,
            "content" => $content
        ];
        Notification::create([
            "user_id" => $user_id,
            "user_to_notify" => $user_to_notify,
            "data" => json_encode($data),
            "type" => "comment",
        ]);
    }

    public function saveFollow($user_id, $user_to_notify)
    {
        if ($user_id == $user_to_notify) return;
        $data = [
            "user_id" => $user_id,
        ];
        Notification::create([
            "user_id" => $user_id,
            "user_to_notify" => $user_to_notify,
            "data" => json_encode($data),
            "type" => "follow",
        ]);
    }

}