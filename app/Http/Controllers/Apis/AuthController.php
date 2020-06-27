<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Laravel\Passport\Client as OClient; 
use GuzzleHttp\Client;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\PasswordReset;


class AuthController extends Controller
{

    private $successStatus = 200;


    function __construct(){}

    /*
        POST login
        route /api/oauth/login    
    */
    public function login(Request $req) { 
        $email = request('email');
        $username = request('username');
        $password = request('password');

        // check if request have validation
        if (Auth::attempt(['email' =>$email, 'password' => $password]) || Auth::attempt(['username' => $username, 'password' => $password])) { 

            // get record in table oath_client have password_client equal 1
            $oClient = OClient::where('password_client', 1)->first();
            // get correct username
            $usernameInput = $username ? $username : $email;
            return $this->getTokenAndRefreshToken($oClient, $usernameInput, $password);
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
        $refresh_token = request('refresh_token') || '';
        return $this->refreshAndGetToken($oClient, $refresh_token);
    }

    /*
        POST
        route /api/oauth/password/reset  
        reset pasword  
    */
    public function resetPasswordToMail(Request $req)
    {
        $user = User::where('email', $req->email)->firstOrFail();
        $passwordReset = PasswordReset::updateOrCreate([
            'email' => $user->email,
        ], [
            'token' => Str::random(60),
        ]);
  
        return response()->json([
        'message' => 'We have e-mailed your password reset link!'
        ]);
    }

    /*
        POST 
        route /api/oauth/password/reset-cofirm-token
        confirm code reset password    
    */
    public function resetPasswordConfirmToken(Request $req)
    {
        
    }
    
    /*
        GET user test
        route /api/user    
    */
    public function getAuthenticatedUser(Request $request)
    {
        return response()->json($request->user(), 200);
    }


    //===================================================================================================================================
    //  Function

    /*
        Request url /oauth/token with type password.
        Get access_token and refresh_token
    */
    public function getTokenAndRefreshToken(OClient $oClient, $email, $password) { 

        $client = new Client([
            'headers' => [ 'Content-Type' => 'application/json' ], //set body json
            // 'base_uri' => config('app.url') //get from env APP_URL or app config url
        ]);  // Create Client with baseUri

        /*
            Request this server
            If success get body and get code
            else get body exception and code
        */
        try {
            $response = $client->post(config('app.url').'/oauth/token',
                ['body' => json_encode(
                    [
                        'grant_type' => 'password',
                        'client_id' => $oClient->id,
                        'client_secret' => $oClient->secret,
                        'username' => $email,
                        'password' => $password,
                        'scope' => '*',
                    ]
                )]
            );
            $result = $response->getBody()->getContents();
            $code = $response->getStatusCode();

        } catch (\Exception $exception) {
            $result = $exception->getMessage();
            $code = $exception->getCode();
        }

        return response()->json(json_decode($result), $code); // return code and result
    }


    /*
        Request url /oauth/token with type refresh_token.
        Get access_token and refresh_token
    */
    public function refreshAndGetToken(OClient $oClient, $refresh_token)
    {
        $client = new Client([
            'headers' => [ 'Content-Type' => 'application/json' ], //set body json
            // 'base_uri' => config('app.url') //get from env APP_URL or app config url
        ]); // Create Client with baseUri

        /*
            Request this server
            If success get body and get code
            else get body exception and code
        */
        try {

            $response = $client->post(config('app.url').'/oauth/token',
                ['body' => json_encode([
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $refresh_token,
                    'client_id' => $oClient->id,
                    'client_secret' => $oClient->secret,
                ])
            ]);

            $result = $response->getBody()->getContents();
            $code = $response->getStatusCode();

        } catch (\Exception $exception) {
            $result = $exception->getMessage();
            $code = $exception->getCode();
        }

        return response()->json(json_decode($result), $code); // return code and result
    }

}
