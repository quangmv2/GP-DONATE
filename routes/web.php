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

Route::get('/', function () {
    return view('teaser.teaser');
});
// 
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
        // Route::resource('audios','AudioController');
        // Route::resource('books','BookController');
        // Route::resource('books-chapter','BookChapterController');
        // Route::resource('categories','CategoryController');
        // Route::resource('categories-audios','CategoryController');
        // Route::resource('categories-books','CategoryController');
        // Route::resource('menus','MenuController');
        // Route::resource('quotes','QuoteController');
        // Route::resource('quoteslider','QuoteSliderController');
        // Route::resource('events','EventController');
        // Route::resource('app-images','AppImageController');

        Route::get('/pages', 'PageController@index')->name('pages.index');
        Route::post('/pages', 'PageController@store')->name('pages.store');
    });

    // Route::get('/users-list', 'UserController@list');
    // Route::get('/posts-list', 'PostController@list');
    // Route::get('/audios-list', 'AudioController@list');
    // Route::get('/books-list', 'BookController@list');
    // Route::get('/quotes-list', 'QuoteController@list');
    // Route::get('/events-list', 'EventController@list');
    // Route::get('/events-summary', 'EventController@summary');
    // Route::get('app-images-list','AppImageController@list');
});

