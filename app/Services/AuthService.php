<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Laravel\Passport\Client as OClient; 
use GuzzleHttp\Client;
use Carbon\Carbon;
use App\Models\PasswordReset;
use App\Notifications\ResetPasswordRequest;
use Illuminate\Support\Str;

use App\Services\UserService;
use App\Models\User;

class AuthService
{
    
    protected $userService;
    
    function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function getTokenAndRefreshToken(OClient $oClient, $email, $password) { 


        $client = new Client([
            'headers' => [ 'Content-Type' => 'application/json' ], //set body json
            'base_uri' => env('APP_URL') //get from env APP_URL or app config url
        ]);  // Create Client with baseUri

        /*
            Request this server
            If success get body and get code
            else get body exception and code
        */
        try {
            $response = $client->post('/oauth/token',
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

    public function refreshAndGetToken(OClient $oClient, $refresh_token)
    {
        $client = new Client([
            'headers' => [ 'Content-Type' => 'application/json' ], //set body json
            'base_uri' => env('APP_URL') //get from env APP_URL or app config url
        ]); // Create Client with baseUri
        /*
            Request this server
            If success get body and get code
            else get body exception and code
        */
        try {

            $response = $client->post('/oauth/token',
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

    public function resetPassword($email)
    {
        $user = User::where('email', $email)->firstOrFail();
        $passwordReset = PasswordReset::updateOrCreate([
            'email' => $user->email,
        ],[
            // 'token' => Str::random(6),
            'token' => "ABCDEF",
        ]);
    }

}