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
    Route::delete('logout', 'Apis\AuthController@logout')->middleware('auth:api');
    Route::post('refresh-token', 'Apis\AuthController@refreshToken');
    Route::post('password/reset', 'Apis\AuthController@resetPasswordToMail');
    Route::post('password/reset-confirm-token', 'Apis\AuthController@resetPasswordConfirmToken');

});

    

Route::get('photo', 'Apis\PostController@showPhoto'); //get photo for driectory
Route::post('photo/up', 'Apis\PostController@storePhoto'); //Upload image

Route::group(['prefix' => 'posts'], function () {
    Route::get('search', 'Apis\PostController@searchPost');
    Route::get('{id}/comments', 'Apis\PostController@getComments'); 
    Route::get('{id}/likes', 'Apis\PostController@getLikes'); 
    Route::get('{id}/commented', 'Apis\PostController@checkCommented');
});

Route::group(['prefix' => 'profile'], function () {
    Route::get('likes', 'Apis\ProfileController@getLikes'); 
    Route::get('search', 'Apis\ProfileController@searchPeople');
    Route::get('{id}/following', "Apis\ProfileController@getFollowingOfUser");
    Route::get('{id}/followed', "Apis\ProfileController@getFollowedOfUser");
    Route::get('{id}/posts', "Apis\ProfileController@getPostOfUser");
    Route::get('{id}/follow', "Apis\ProfileController@checkFollowUser");
    Route::put('{id}/follow', "Apis\ProfileController@followUser");
    Route::put('{id}/toggle-follow', "Apis\ProfileController@toggleFollowUser");
    Route::delete('{id}/un-follow', "Apis\ProfileController@unfollowUser");

});

Route::apiResources([
    'user' => 'Apis\UserController',
    'posts'=> 'Apis\PostController',
    'comment' => 'Apis\CommentController',
    'like' => 'Apis\LikeController',
    'profile' => 'Apis\ProfileController',
    'hastag' => 'Apis\HastagController',
    'noti' => 'Apis\NotificationController',
    'message' => 'Apis\MessageController'
]);




Route::group(['prefix' => 'user'], function () {
    Route::post('me/code-invitation', 'Apis\UserController@codeInvitation');
    Route::post('me/update-role', 'Apis\UserController@updateRole');
});

Route::post('test-socket', "Apis\UserController@testSoket");

