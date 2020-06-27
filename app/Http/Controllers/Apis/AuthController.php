<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Laravel\Passport\Client as OClient; 
use GuzzleHttp\Client;


use App\User;


class AuthController extends Controller
{

    private $successStatus = 200;
    private $baseUri = 'http://127.0.0.1:8000';

    function __construct()
    {
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
        tiengiangdang   
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
        GET
        route /api/oauth/password/reset  
        reset pasword  
    */
    public function getResetPassword(Request $req)
    {
        
    }

    /*
        POST 
        route /api/oauth/password/reset
        confirm code reset password    
    */
    public function postResetPassword(Request $req)
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
//  Funtion

    /*
        Request url /oauth/token with type password.
        Get access_token and refresh_token
    */
    public function getTokenAndRefreshToken(OClient $oClient, $email, $password) { 

        $client = new Client;  // Create Client with baseUri

        /*
            Request this server
            If success get body and get code
            else get body exception and code
        */

        try {

            $response = $client->post('http://127.0.0.1:8000/oauth/token', [
                'form_params' => [
                    'grant_type' => 'password',
                    'client_id' => $oClient->id,
                    'client_secret' => $oClient->secret,
                    'username' => $email,
                    'password' => $password,
                    'scope' => '*',
                ],
            ]);
            var_dump($response->getBody()); die;
            // $result = json_decode((string) $response->getBody(), true);
            // $code = $response->getStatusCode();

        } catch (\Exception $exception) {
            // $result = json_decode((string) $exception->getResponse()->getBody(), true);
            // $code = $exception->getCode();
            var_dump('pass error');
            die;
        }

        // return response()->json($result, $code); // return code and result
    }


    /*
        Request url /oauth/token with type refresh_token.
        Get access_token and refresh_token
    */
    public function refreshAndGetToken(OClient $oClient, $refresh_token)
    {
        $client = new Client(['base_uri' => $this->baseUri]); // Create Client with baseUri

        /*
            Request this server
            If success get body and get code
            else get body exception and code
        */
        try {

            $response = $client->post('/oauth/token', [
                'form_params' => [
                    'grant_type' => 'refresh_token',
                    'refresh_token' => $refresh_token,
                    'client_id' => $oClient->id,
                    'client_secret' => $oClient->secret,
                ],
            ]);

            $result = json_decode((string) $response->getBody(), true);
            $code = $response->getStatusCode();

        } catch (\Exception $exception) {
            $result = json_decode((string) $exception->getResponse()->getBody(), true);
            $code = $exception->getCode();
        }

        return response()->json($result, $code); // return code and result
    }

}
