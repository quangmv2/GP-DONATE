<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Comment extends Model
{
    protected $fillable = [
        'post_id', 'user_id', 'content'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
