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

// Route::post('register', 'API\PassportController@register');
Route::post('login', 'Apis\AuthController@login');

Route::middleware('auth:api')->get('/user', "Apis\AuthController@getAuthenticatedUser");

Route::get('/posts','Apis\PostController@index');

Route::get('/posts/{id}','Apis\PostController@detail');

