<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
// Router for teaser
Route::get('/teaser', function () {
    return view('teaser.teaser');
});
//Router for client reactjs

//Router for administrator 

Route::group(['prefix' => 'admin'], function () {
    Auth::routes();
    Route::get('logout', 'Auth\LoginController@logout');
    Route::group(['middleware' => ['auth', 'auth', 'permission:admin-page']], function() {
        Route::get('/', 'HomeController@index')->name('adminHome');
        Route::get('/home', 'HomeController@index')->name('home');

        Route::get('posts/{id}/hidden','PostController@hiddenPost');
        Route::get('posts/{id}/show','PostController@showPost');

        Route::get('comment/{id}/hidden','CommentController@hiddenComment');
        Route::get('comment/{id}/show','CommentController@showComment');


        Route::resource('roles','RoleController');
        Route::resource('users','UserController');
        Route::resource('posts','PostController');
        Route::resource('comment','CommentController');
        Route::get('users-list','UserController@list');
        Route::get('/posts-list', 'PostController@list');
    });  
    Route::get('/{any}', function () {
        return 404;
    });
});

Route::get('/', function () {
    return view('client.app');
});

Route::get('/{any}', function ($any) {
    return view('client.app');
})->where('any', '.*');
Route::get('/client', function () {
    return view('client.app');
});