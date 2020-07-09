<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Like extends Model
{
    // protected $primaryKey = ['post_id', 'user_id'];
    protected $fillable = [
        'post_id', 'user_id'
    ];
    
    public function user(){
    	return $this->belongsTo(User::class);
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }

}
