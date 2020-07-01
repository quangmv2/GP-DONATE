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

Route::apiResources([
    'user' => 'Apis\UserController',
    'posts'=> 'Apis\PostController'
]);
Route::get('photos/show', 'Apis\PostController@uploadForm');
Route::post('photos/create', 'Apis\PostController@storePhoto');

Route::group(['prefix' => 'user'], function () {
    Route::post('me/code-invitation', 'Apis\UserController@codeInvitation');
});


