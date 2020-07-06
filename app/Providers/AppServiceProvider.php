<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
use App\Services\CommonService;
use App\Services\PostService;


class AppServiceProvider extends ServiceProvider
{

    // public $singletons = [
    //     ServerToolsProvider::class => PostService::class,
    // ];
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('CommonService', function ($app) {
            return new CommonService();
        });
        $this->app->singleton('PostService', function ($app) {
            return new PostService();
        });
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
