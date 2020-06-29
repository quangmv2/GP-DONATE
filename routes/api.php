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



Route::group(['prefix' => 'oauth'], function () {

    Route::post('register', 'Apis\AuthController@register');
    Route::post('login', 'Apis\AuthController@login');
    Route::post('logout', 'Apis\AuthController@logout')->middleware('auth:api');
    Route::post('refresh-token', 'Apis\AuthController@refreshToken');
    Route::post('password/reset', 'Apis\AuthController@resetPasswordToMail');
    Route::post('password/reset-confirm-token', 'Apis\AuthController@resetPasswordConfirmToken');

});

Route::resource('posts', 'Apis\PostController');

Route::middleware('auth:api')->get('/user', "Apis\AuthController@getAuthenticatedUser");

Route::get('/posts','Apis\PostController@index');

Route::get('/posts/{id}','Apis\PostController@detail');

