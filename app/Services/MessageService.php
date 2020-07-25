<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;

use App\Models\Message;

class MessageService
{
    
    public function validate($request)
    {
        $request->validate([
            'to' =>'required|exists:users,id',
            'content' =>'required',  
        ]);
    }

    public function save($from, $to, $content)
    {
        return Message::create([
            'user_id' => $from,
            'user_id_to' => $to,
            'content' => $content
        ]);
    }

    public function getMessages($user_id)
    {
        $messages = Message::where('user_id', $user_id)
                            ->orWhere('user_id_to', $user_id)
                            // ->orderBy('created_at', 'desc')
                            ->select('user_id', 'user_id_to')
                            ->distinct()->get();
                            // ->simplePaginate(20);
        $result = [];
        foreach ($messages as $index => $message) {
            $i = $index + 1;
            $k = true;
            $tmp = [];
            while ($i < count($messages)) {
                if ($messages[$i]->user_id == $message->user_id_to && $message->user_id == $messages[$i]->user_id_to){
                    $k = false;
                    break;
                } else {
                    $i++;
                }
            }
            
            if ($k) {
                $tmp = Message::where('user_id', $message->user_id)
                            ->where('user_id_to', $message->user_id_to)
                            ->orderBy('created_at', 'desc')->first();
                $tmp->user;
                $tmp->userTo;
                $result[] = $tmp;
            }
        }
        return $result;  
    }

    public function getMessageDetail($user_id, $user_id_to)
    {
        $messages = Message::where(function ($query) use ($user_id, $user_id_to) {
                                $query->where('user_id', $user_id)->where('user_id_to', $user_id_to);
                            })
                            ->orWhere(function ($query) use ($user_id, $user_id_to) {
                                $query->where('user_id_to', $user_id)->where('user_id', $user_id_to);
                            })
                            ->orderBy('created_at', 'desc')
                            ->paginate(15);
        return $messages;
    }

}