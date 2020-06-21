<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/events', 'Apis\EventController@index');
Route::get('/audios','Apis\AudioController@index');
Route::get('/posts','Apis\PostController@index');

Route::get('/events/{id}', 'Apis\EventController@detail');
Route::get('/audios/{id}','Apis\AudioController@detail');
Route::get('/posts/{id}','Apis\PostController@detail');

Route::get('/books','Apis\BookController@index');
Route::get('/books/{id}','Apis\BookController@detail');
Route::get('/books-chapter/{id}','Apis\BookController@detailChapter');

Route::get('/pages-settings','Apis\PageController@listPage');
Route::get('/data','Apis\PageController@getData');
Route::get('/home','Apis\PageController@home');
//Route::get('/pages/{name}','Apis\PageController@pageDetail');

Route::get('/categories','Apis\CategoryController@index');
