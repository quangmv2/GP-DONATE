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

    
    Route::get('posts/photo', 'Apis\PostController@showPhoto'); //get photo for driectory
    Route::post('posts/photo', 'Apis\PostController@storePhoto'); //Upload image
    Route::get('posts/{id}/comments', 'Apis\PostController@getComments'); 
    Route::get('posts/{id}/likes', 'Apis\PostController@getLikes'); 

    Route::apiResources([
        'user' => 'Apis\UserController',
        'posts'=> 'Apis\PostController',
        'comment' => 'Apis\CommentController',
        'like' => 'Apis\LikeController',
    ]);




Route::group(['prefix' => 'user'], function () {
    Route::post('me/code-invitation', 'Apis\UserController@codeInvitation');
});

Route::post('test-socket', "Apis\UserController@testSoket");

