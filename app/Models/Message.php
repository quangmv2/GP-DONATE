<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Message extends Model
{
    protected $fillable = [
        'user_id', 'user_id_to', 'content', 'read'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function userTo()
    {
        return $this->belongsTo(User::class, 'user_id_to');
    }
}
