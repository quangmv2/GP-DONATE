<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;
use App\Models\Post;
use App\Models\Category;
use App\Models\Module;
use App\Models\Code;
use App\Models\Like;
use App\Models\Follow;

class User extends Authenticatable
{
    use Notifiable;
    use HasRoles;
    use HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name', 'last_name', 'username', 'email', 'password', 'address', 'code_id', 'personal_photo', 'gender', 'remember_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Find the user instance for the given username.
     *
     * @param  string  $username
     * @return \App\User
     */
    public function findForPassport($username)
    {
        return $this->where('username', $username)->orWhere('email', $username)->first();
    }

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function likes(){
        return $this->hasMany(Like::class);
    }

    public function following(){
        return $this->hasMany(Follow::class, 'user_id_from', 'id');
    }

    public function followed(){
        return $this->hasMany(Follow::class, 'user_id_to', 'id');
    }

    // public function getCountPosts()
    // {
    //     return $this->posts->id->count();
    // }

    // public function categories(){
    //     return $this->hasMany(Category::class, 'user_id', 'id');
    // }

    // public function menus(){
    //     return $this->hasMany(Module::class, 'user_id', 'id');
    // }

    public function codeInvitation()
    {
        return $this->belongsTo(Code::class, 'code_id', 'code');
    }
}
