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

//Router for administrator 
Route::prefix('admin')->group(function(){
    // Route::redirect('/', 'admin/home');
    Auth::routes();
    Route::get('/', 'HomeController@index');
    Route::get('/home', 'HomeController@index')->name('home');
    Route::get('logout', 'Auth\LoginController@logout');

    Route::group(['middleware' => ['auth']], function() {
        Route::resource('roles','RoleController');
        Route::resource('users','UserController');
        Route::resource('posts','PostController');
        Route::get('users-list','UserController@list');
    });

});

