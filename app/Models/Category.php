<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\User;
use App\Model\Post;

class Category extends Model
{
    use Notifiable;

    protected $table = "categories";

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'description', 'slug', 'feature_image', 'user_id', 'type', 'parent_id'
    ];

    public function user(){
    	return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function posts() {
        return $this->belongsToMany(Post::class, 'category_post', 'post_id', 'category_id');
    }
}
