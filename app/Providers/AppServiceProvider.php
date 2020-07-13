<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Services\CommonService;
use App\Services\CommentService;
use App\Services\PostService;
use App\Services\LikeService;
use App\Services\UserService;
use App\Services\FollowService;
use App\Services\AuthService;


class AppServiceProvider extends ServiceProvider
{

    public $singletons = [
        CommonService::class => CommonService::class,
        CommentService::class => CommentService::class,
        PostService::class => PostService::class,
        LikeService::class => LikeService::class,
        UserService::class => UserService::class,
        FollowService::class => FollowService::class,
        AuthService::class => AuthService::class,
    ]
    ;
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Schema::defaultStringLength(191);
    }
}
