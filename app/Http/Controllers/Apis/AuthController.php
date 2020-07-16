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

    /**
     * @SWG\Post(
     *     path="api/oauth/register",
     *     tags={"OAUTH"},
     *     summary={"Đăng ký"},
     *     description="Đăng ký người dùng mới",  
     *     @SWG\Parameter(
     *         name="first_name",
     *         in="formData",
     *         type="string",
     *         description="first_name",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="last_name",
     *         in="formData",
     *         type="string",
     *         description="last_name",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="username",
     *         in="formData",
     *         type="string",
     *         description="username",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="email",
     *         in="formData",
     *         type="string",
     *         description="email",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="password",
     *         in="formData",
     *         type="string",
     *         description="Mật khẩu",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="confirm-password",
     *         in="formData",
     *         type="string",
     *         description="confirm password",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="gender",
     *         in="formData",
     *         type="string",
     *         description="Giới tính",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="role",
     *         in="formData",
     *         type="string",
     *         description="Vai trò",
     *         required=false,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="token_type", type="string", example="Bearer"),
    *            @SWG\Property(property="expires_in", type="interger", example=150),
    *            @SWG\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTcxNGEzZjZkMDQzNjViMWE3NWNlMmQwMTBkOWU5ZTE2NTUyMmJmMDI0MDdmMjRlZWVjYjU1MTgwODRjOGFiMDhhMDlhNGQxMjQ4ZjkwZTAiLCJpYXQiOjE1OTQ2MzUzNjgsIm5iZiI6MTU5NDYzNTM2OCwiZXhwIjoxNTk0ODk0NTY4LCJzdWIiOiI0Iiwic2NvcGVzIjpbIioiXX0.EFEGGgAhtRWhHNg2NtVD0vK_nU0zO6Wux5WAKrdSrFF6B-qf1WAELkNTxHP1aSDhQT9vfRaMYvqdq27MHg9dH4cKD5HAGHUBlPAhZolS7TX3xVpp2DykAtIhYWnThzkVEV6JeUU5DB4dB8haPe6jexGC652eHUJqMvYhZ7W1fnZnTmiTPfb5bHrj1dFKvPpkR2l0Lydz__kXCcT4g1lrQMjRlVRRxCvWxqOCP2XJ7o98YzymPO5i8zFeR3ZLofrj82JV4PV09XejcM2j76vwHEe2ntdDcobO4fLF23PkcdcHstQ-CD9qBEddpwzef-Sz9q1GoHVcwQmiFrHeVCmaoUSL_O7BGpbuFA5qygexIcwvKUafkx2FfA9nZrpcp8z8aFjEYi-GpRm3KiwFa20abcz7YAk6I34NhrffoJNT1g0ISyabGOkvWBp1andC5jN_Osj_lqtkSjmvrEobcL5XjWs4Y4dXGyn2Xtlt8MXZYY-5AcVlOmTqo77FYd6W5vvOmtA8FkESRaRUpfBTmlUVz5ro4vTx853sMQWfttSm97DcwtXFRZGUUS-cqzTmK1o9kBVzCkbDqSIvStpKjmqJf0bz20lE-rBB2x56gBdyyzTdFcosAUIeX9_5jRmKzZXrWa2yytlzQOGI-hH_3iAFAWebYioWn813OT-PST_QIWU"),
    *            @SWG\Property(property="refresh_token", type="string", example="def502002df62fe30ed3a1afce33a524f1ab20ee4cb8568f4c7b4b1513652ff2c76fa029fee4067e8809fa9e090d32ea94b1199b212b99f963ba39ac4f565b953aebbce23a54d94b001342b08917a8224c48df32bcbdb8f91424a202f204f143c0acca821eeff69f490675742b17117817e8c182e88336444f99f86a4fc21a22fce64701fd010badac70b25b06a19bfb5c9afe946ad74691234abffad3908067e53be6ca127cf0b1e58074b2dd7fce9971946c20a32bd5e119794d81c197c851f7f93552bcdb87d780db81ab1df06c53b33fae1f07683172286863de4b01f0297765b0246fbcee889bed27b0ffbfabcbefe3680726ce688501e60bf29792973836ad924adcf0e1838a49cee6578d302e4a4db3fc5a9d2ac370a904ef61c1c52b4d3dc0c1ae9ca614a06f73fcffb9b660910591a20615f602af57cd51d5a8ae8de29e8c634c85a035ba700ace7fcd13d3e937856c77df23572e73d0c1ebfdf59ba68313ac"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="UNPROCESSABLE ENTITY",
     *     )
     * )
     */
    public function register(Request $req){
        $this->validate($req, [
            'username' => 'required|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'gender' => 'numeric|min:0|max:2',
            'role' => 'in:giver,taker'
        ]);
        $input = $req->all();
        $input['password'] = Hash::make($input['password']);

        if (empty($input['first_name'])) $input['first_name'] = $input['username'];
        if (empty($input['last_name'])) $input['last_name'] = $input['username'];

        $user = User::create($input);
        if (!empty($input['role']))
            $user->assignRole($input['role']);

        $oClient = OClient::where('password_client', 1)->first();
        return $this->authService->getTokenAndRefreshToken($oClient, $user->username, $req->password);
   }


   /**
     * @SWG\Post(
     *     path="api/oauth/login",
     *     tags={"OAUTH"},
     *     summary={"Đăng nhập"},
     *     description="Đăng nhập",  
     *     @SWG\Parameter(
     *         name="username",
     *         in="formData",
     *         type="string",
     *         description="username",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="password",
     *         in="formData",
     *         type="string",
     *         description="password",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="token_type", type="string", example="Bearer"),
    *            @SWG\Property(property="expires_in", type="interger", example=150),
    *            @SWG\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTcxNGEzZjZkMDQzNjViMWE3NWNlMmQwMTBkOWU5ZTE2NTUyMmJmMDI0MDdmMjRlZWVjYjU1MTgwODRjOGFiMDhhMDlhNGQxMjQ4ZjkwZTAiLCJpYXQiOjE1OTQ2MzUzNjgsIm5iZiI6MTU5NDYzNTM2OCwiZXhwIjoxNTk0ODk0NTY4LCJzdWIiOiI0Iiwic2NvcGVzIjpbIioiXX0.EFEGGgAhtRWhHNg2NtVD0vK_nU0zO6Wux5WAKrdSrFF6B-qf1WAELkNTxHP1aSDhQT9vfRaMYvqdq27MHg9dH4cKD5HAGHUBlPAhZolS7TX3xVpp2DykAtIhYWnThzkVEV6JeUU5DB4dB8haPe6jexGC652eHUJqMvYhZ7W1fnZnTmiTPfb5bHrj1dFKvPpkR2l0Lydz__kXCcT4g1lrQMjRlVRRxCvWxqOCP2XJ7o98YzymPO5i8zFeR3ZLofrj82JV4PV09XejcM2j76vwHEe2ntdDcobO4fLF23PkcdcHstQ-CD9qBEddpwzef-Sz9q1GoHVcwQmiFrHeVCmaoUSL_O7BGpbuFA5qygexIcwvKUafkx2FfA9nZrpcp8z8aFjEYi-GpRm3KiwFa20abcz7YAk6I34NhrffoJNT1g0ISyabGOkvWBp1andC5jN_Osj_lqtkSjmvrEobcL5XjWs4Y4dXGyn2Xtlt8MXZYY-5AcVlOmTqo77FYd6W5vvOmtA8FkESRaRUpfBTmlUVz5ro4vTx853sMQWfttSm97DcwtXFRZGUUS-cqzTmK1o9kBVzCkbDqSIvStpKjmqJf0bz20lE-rBB2x56gBdyyzTdFcosAUIeX9_5jRmKzZXrWa2yytlzQOGI-hH_3iAFAWebYioWn813OT-PST_QIWU"),
    *            @SWG\Property(property="refresh_token", type="string", example="def502002df62fe30ed3a1afce33a524f1ab20ee4cb8568f4c7b4b1513652ff2c76fa029fee4067e8809fa9e090d32ea94b1199b212b99f963ba39ac4f565b953aebbce23a54d94b001342b08917a8224c48df32bcbdb8f91424a202f204f143c0acca821eeff69f490675742b17117817e8c182e88336444f99f86a4fc21a22fce64701fd010badac70b25b06a19bfb5c9afe946ad74691234abffad3908067e53be6ca127cf0b1e58074b2dd7fce9971946c20a32bd5e119794d81c197c851f7f93552bcdb87d780db81ab1df06c53b33fae1f07683172286863de4b01f0297765b0246fbcee889bed27b0ffbfabcbefe3680726ce688501e60bf29792973836ad924adcf0e1838a49cee6578d302e4a4db3fc5a9d2ac370a904ef61c1c52b4d3dc0c1ae9ca614a06f73fcffb9b660910591a20615f602af57cd51d5a8ae8de29e8c634c85a035ba700ace7fcd13d3e937856c77df23572e73d0c1ebfdf59ba68313ac"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="UNPROCESSABLE ENTITY",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     * )
     */
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


    /**
     * @SWG\Delete(
     *     path="api/oauth/logout",
     *     tags={"OAUTH"},
     *     summary={"Đăng xuất"},
     *     description="Đăng xuất", 
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="message", type="string", example="success"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     * )
     */
    /*
        DELETE logout
        route /api/oauth/logout 
    */
    public function logout(Request $req)
    {
        $req->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);
    }

    /**
     * @SWG\Post(
     *     path="api/oauth/refresh-token",
     *     tags={"OAUTH"},
     *     summary={"Làm mới token"},
     *     description="Làm mới token", 
     *     @SWG\Parameter(
     *         name="refresh_token",
     *         in="formData",
     *         type="string",
     *         description="refresh_token",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="token_type", type="string", example="Bearer"),
    *            @SWG\Property(property="expires_in", type="interger", example=150),
    *            @SWG\Property(property="access_token", type="string", example="eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiOTcxNGEzZjZkMDQzNjViMWE3NWNlMmQwMTBkOWU5ZTE2NTUyMmJmMDI0MDdmMjRlZWVjYjU1MTgwODRjOGFiMDhhMDlhNGQxMjQ4ZjkwZTAiLCJpYXQiOjE1OTQ2MzUzNjgsIm5iZiI6MTU5NDYzNTM2OCwiZXhwIjoxNTk0ODk0NTY4LCJzdWIiOiI0Iiwic2NvcGVzIjpbIioiXX0.EFEGGgAhtRWhHNg2NtVD0vK_nU0zO6Wux5WAKrdSrFF6B-qf1WAELkNTxHP1aSDhQT9vfRaMYvqdq27MHg9dH4cKD5HAGHUBlPAhZolS7TX3xVpp2DykAtIhYWnThzkVEV6JeUU5DB4dB8haPe6jexGC652eHUJqMvYhZ7W1fnZnTmiTPfb5bHrj1dFKvPpkR2l0Lydz__kXCcT4g1lrQMjRlVRRxCvWxqOCP2XJ7o98YzymPO5i8zFeR3ZLofrj82JV4PV09XejcM2j76vwHEe2ntdDcobO4fLF23PkcdcHstQ-CD9qBEddpwzef-Sz9q1GoHVcwQmiFrHeVCmaoUSL_O7BGpbuFA5qygexIcwvKUafkx2FfA9nZrpcp8z8aFjEYi-GpRm3KiwFa20abcz7YAk6I34NhrffoJNT1g0ISyabGOkvWBp1andC5jN_Osj_lqtkSjmvrEobcL5XjWs4Y4dXGyn2Xtlt8MXZYY-5AcVlOmTqo77FYd6W5vvOmtA8FkESRaRUpfBTmlUVz5ro4vTx853sMQWfttSm97DcwtXFRZGUUS-cqzTmK1o9kBVzCkbDqSIvStpKjmqJf0bz20lE-rBB2x56gBdyyzTdFcosAUIeX9_5jRmKzZXrWa2yytlzQOGI-hH_3iAFAWebYioWn813OT-PST_QIWU"),
    *            @SWG\Property(property="refresh_token", type="string", example="def502002df62fe30ed3a1afce33a524f1ab20ee4cb8568f4c7b4b1513652ff2c76fa029fee4067e8809fa9e090d32ea94b1199b212b99f963ba39ac4f565b953aebbce23a54d94b001342b08917a8224c48df32bcbdb8f91424a202f204f143c0acca821eeff69f490675742b17117817e8c182e88336444f99f86a4fc21a22fce64701fd010badac70b25b06a19bfb5c9afe946ad74691234abffad3908067e53be6ca127cf0b1e58074b2dd7fce9971946c20a32bd5e119794d81c197c851f7f93552bcdb87d780db81ab1df06c53b33fae1f07683172286863de4b01f0297765b0246fbcee889bed27b0ffbfabcbefe3680726ce688501e60bf29792973836ad924adcf0e1838a49cee6578d302e4a4db3fc5a9d2ac370a904ef61c1c52b4d3dc0c1ae9ca614a06f73fcffb9b660910591a20615f602af57cd51d5a8ae8de29e8c634c85a035ba700ace7fcd13d3e937856c77df23572e73d0c1ebfdf59ba68313ac"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="UNPROCESSABLE ENTITY",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated",
     *     ),
     * )
     */
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


    /**
     * @SWG\Post(
     *     path="/api/oauth/password/reset",
     *     tags={"OAUTH"},
     *     summary={"Quên mật khẩu"},
     *     description="Quên mật khẩu", 
     *     @SWG\Parameter(
     *         name="email",
     *         in="formData",
     *         type="string",
     *         description="email",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="message", type="string", example="We have e-mailed your password reset link!"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="UNPROCESSABLE ENTITY",
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Not Found Email",
     *     ),
     * )
     */
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


    /**
     * @SWG\Post(
     *     path="/api/oauth/password/reset-confirm-token",
     *     tags={"OAUTH"},
     *     summary={"Xác nhận mật khẩu mới"},
     *     description="Xác nhận mật khẩu mới", 
     *     @SWG\Parameter(
     *         name="token",
     *         in="formData",
     *         type="string",
     *         description="token",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="password",
     *         in="formData",
     *         type="string",
     *         description="password",
     *         required=true,
     *     ),
     *     @SWG\Parameter(
     *         name="password_confirm",
     *         in="formData",
     *         type="string",
     *         description="password_confirm",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *            @SWG\Property(property="message", type="string", example="We have e-mailed your password reset link!"),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="UNPROCESSABLE ENTITY",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="This password reset token is invalid",
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Password not equal Confirm Password",
     *     ),
     * )
     */
    /*
        POST 
        route /api/oauth/password/reset-confirm-token
        confirm code and reset password    
    */
    public function resetPasswordConfirmToken(Request $req)
    {

        $this->validate($req, [
            'token' => 'required',
            'password' => 'required',
            'password_confirm' => 'required|unique:users,username',
        ]);
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
