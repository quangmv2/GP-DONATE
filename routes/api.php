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



Route::group(['prefix' => 'auth'], function () {
    // Route::post('register', 'API\PassportController@register');

    Route::post('login', 'Apis\AuthController@login');
    Route::post('logout', 'Apis\AuthController@logout');
    Route::post('refresh-token', 'Apis\AuthController@refreshToken');
    Route::get('password/reset', 'Apis\AuthController@getResetPassword');
    Route::post('password/reset', 'Apis\AuthController@postResetPassword');

});


Route::middleware('auth:api')->get('/user', "Apis\AuthController@getAuthenticatedUser");

Route::get('/posts','Apis\PostController@index');

Route::get('/posts/{id}','Apis\PostController@detail');

