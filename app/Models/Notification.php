<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Notification extends Model
{
    protected $fillable = [
        'user_id', 'user_to_notify', 'type', 'data', 'read'
    ];

    public function user()
    {
        return $this->hasOne(User::class, 'user_id', 'id');
    }

    public function userTo()
    {
        return $this->hasOne(User::class, 'user_to_notify', 'id');
    }

}
