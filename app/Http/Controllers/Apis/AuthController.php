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

    function __construct()
    {
    }

    public function login(Request $req) { 
        if (Auth::attempt(['email' => request('email'), 'password' => request('password')]) || Auth::attempt(['username' => request('username'), 'password' => request('password')])) { 
            $oClient = OClient::where('password_client', 1)->first();
            // return $oClient;
            return $this->getTokenAndRefreshToken($oClient, request('username'), request('password'));
        } 
        else { 
            return response()->json(['error'=>'Unauthorised'], 401); 
        } 
    }

    public function getTokenAndRefreshToken(OClient $oClient, $email, $password) { 
        $oClient = OClient::where('password_client', 1)->first();
        $client = new Client(['base_uri' => 'http://127.0.0.1:8001']);
        $response = $client->post('/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => $oClient->id,
                'client_secret' => $oClient->secret,
                'username' => $email,
                'password' => $password,
                'scope' => '*',
            ],
        ]);

        $result = json_decode((string) $response->getBody(), true);
        return response()->json($result, $this->successStatus);
    }

    public function getAuthenticatedUser(Request $request)
    {

        // $http = new \GuzzleHttp\Client;

        // $response = $http->post('/oauth/token', [
        //     'form_params' => [
        //         'grant_type' => 'password',
        //         'client_id' => 'client-id',
        //         'client_secret' => 'client-secret',
        //         'username' => 'taylor@laravel.com',
        //         'password' => 'my-password',
        //         'scope' => '',
        //     ],
        // ]);

        // return json_decode((string) $response->getBody(), true);

        // $token = $request->user()->tokens->find('20e14096df8f97219fb0f96bd60667572b0492b6a31ab9544a7f634d76b3ab460b9e184f5f99a602');
        // $token->revoke();
        return response()->json($request->user(), 200);
    }
}
