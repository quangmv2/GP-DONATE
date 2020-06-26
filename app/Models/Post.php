<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\User;
use App\Models\Category;

class Post extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'content', 'feature_image', 'slug', 'audio', 'status', 'author'
    ];

    public function user(){
    	return $this->belongsTo(User::class, 'user_id', 'id');
    }

	public function categories() {
        return $this->belongsToMany(Category::class, 'category_post', 'post_id', 'category_id');
    }

    // parent relation
    public function parent(){

        return $this->belongsTo(self::class , 'parent_id');
    }
    //child relation
     public function children()
    {
        return $this->hasMany(self::class ,'parent_id');
    }
}
