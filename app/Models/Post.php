<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\User;
use App\Models\Category;
use App\Models\Like;
use App\Models\Comment;
use App\Models\PostHasOffer;


class Post extends Model
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'content', 'photo_thumbnail', 'full_photo', 'user_id', 'status', 'due_day'
    ];

    public function user(){
    	return $this->hasOne(User::class, 'id', 'user_id');
    }


    // public function hastags()
    // {
    //     return $this->(Hastag::class, 'post_id', 'id');
    // }
    
    public function hastags()
    {
        return $this->belongsToMany(Hastag::class, 'post_has_hastags', 'post_id');
    }

    public function likes()
    {
        return $this->hasMany(Like::class, 'post_id', 'id');
    }

    public function comments()
    {
        return $this->hasMany(Comment::class, 'post_id', 'id');
    }

    public function offers()
    {
        return $this->hasOne(PostHasOffer::class, 'post_id', 'id');
    }

    public function commented($user_id) 
    {
        $commented = Comment::where('user_id', $user_id)->where('post_id', $this->id)->count();
        if ($commented>0) return true;
        return false;
    }

    public function totalLikes()
    {
        return $this->likes()->count();
    }

    // public function totalComments()
    // {
    //     return $this->comments()->count();
    // }

	// public function categories() {
    //     return $this->belongsToMany(Category::class, 'category_post', 'post_id', 'category_id');
    // }

    // parent relation
    // public function parent(){

    //     return $this->belongsTo(self::class , 'parent_id');
    // }
    // //child relation
    //  public function children()
    // {
    //     return $this->hasMany(self::class ,'parent_id');
    // }
}
