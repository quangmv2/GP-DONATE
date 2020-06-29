<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $primaryKey = ['post_id', 'user_id'];
    protected $fillable = [
        'post_id', 'user_id'
    ];
    
}
