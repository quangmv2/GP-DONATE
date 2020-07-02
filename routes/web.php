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
Route::get('/', function () {
    return view('teaser.teaser');
});

//Router for client reactjs
Route::get('/client/{any}', function ($any) {
    return view('client.app');
})->where('any', '.*');
Route::get('/client', function () {
    return view('client.app');
});

//Router for administrator 

Route::group(['prefix' => 'admin'], function () {
    Auth::routes();
    
    Route::get('logout', 'Auth\LoginController@logout');

    Route::group(['middleware' => ['auth', 'auth', 'permission:admin-page']], function() {
        Route::get('/', 'HomeController@index');
        Route::get('/home', 'HomeController@index')->name('home');
        Route::resource('roles','RoleController');
        Route::resource('users','UserController');
        Route::resource('posts','PostController');
        Route::get('users-list','UserController@list');
    });    
});
