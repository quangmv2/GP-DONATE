<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Laravel\Passport\Client as OClient; 
use GuzzleHttp\Client;
use Carbon\Carbon;
use App\Models\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

use App\Models\User;
use App\Events\CommentEvent;
use App\Services\AuthService;



class AuthController extends Controller
{

    private $successStatus = 200;

    private $authService;

    function __construct(AuthService $authService){
        $this->authService = $authService;
    }

    public function register(Request $req){


        $this->validate($req, [
            'first_name' => 'required',
            'last_name' => 'required',
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|same:confirm-password',
            'gender' => 'required|numeric|min:0|max:2',
            'role' => 'required|in:giver,taker'
        ]);


        $input = $req->all();
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);
        $user->assignRole($input['role']);

        $oClient = OClient::where('password_client', 1)->first();
        return $this->getTokenAndRefreshToken($oClient, $user->username, $req->password);
   }

    /*
        POST login
        route /api/oauth/login    
    */
    public function login(Request $req) { 
        $email = request('email');
        $username = request('username');
        $password = request('password');

        // check if request have validation
        if (Auth::attempt(['email' => $username, 'password' => $password]) || Auth::attempt(['username' => $username, 'password' => $password])) { 

            // get record in table oath_client have password_client equal 1
            $oClient = OClient::where('password_client', 1)->first();
            // get correct username
            $usernameInput = $username ? $username : $email;
            return $this->authService->getTokenAndRefreshToken($oClient, Auth::user()->email, $password);
        } 
        else { 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    /*
        POST logout
        route /api/oauth/logout 
    */
    public function logout(Request $req)
    {
        $req->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);
    }


    /*
        POST refreshToken
        route /api/oauth/refresh-token    
    */
    public function refreshToken(Request $req)
    {
        $oClient = OClient::where('password_client', 1)->first();
        $refresh_token = $req->refresh_token;  
        // return response(json_decode($refresh_token));
        return $this->authService->refreshAndGetToken($oClient, $refresh_token);
    }

    /*
        POST
        route /api/oauth/password/reset  
        reset password  
    */
    public function resetPasswordToMail(Request $req)
    {
        $this->authService->resetPassword($req->email);
        return response()->json([
            'message' => 'We have e-mailed your password reset link!'
        ], 200);
    }

    /*
        POST 
        route /api/oauth/password/reset-confirm-token
        confirm code and reset password    
    */
    public function resetPasswordConfirmToken(Request $req)
    {
        $token = $req->token;
        $password = $req->password;
        $passwordConfirm = $req->password_confirm;

        if ($password != $passwordConfirm) {
            return response()->json([
                'message' => 'Password not equal Confirm Password',
            ], 400);
        }

        $passwordReset = PasswordReset::where('token', $token)->firstOrFail();
        if(Carbon::parse($passwordReset->update_at)->addMinutes(2)->isPast()){
            $passwordReset->delete();

            return response()->json([
                'message' => 'This password reset token is invalid.',
            ], 401);
        }
        $user = User::where('email', $passwordReset->email)->firstOrFail();
        $updatePasswordUser = $user->update([
            'password' => bcrypt($req->password)
        ]);
        $passwordReset->delete();

        return response()->json([
            'success' => $updatePasswordUser,
        ], 200);
    }
   
}
