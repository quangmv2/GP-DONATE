<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Code;
use Illuminate\Support\Facades\DB;
use App\Events\CommentEvent;

class UserController extends Controller
{

    
    function __construct(){
        // $this->middleware('auth:api');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $req)
    {
        return response()->json([
            $req->user()
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getAuthenticatedUser(Request $req)
    {
        # code...
    }

    public function codeInvitation(Request $req)
    {
        $codeInput = $req->code_invitation;
        $code = Code::where('code', $codeInput)
                    ->where('used', 0)    
                    ->firstOrFail();
        $user = $req->user();
        try {
            DB::transaction(function() use($code, $user) {
                $user->update([
                    'code_id' => $code->code
                ]);
                $code->update([
                    'used' => 1
                ]);
            });
        } catch (\Throwable $th) {
            return response()->json([
                "message" => "Code not found"
            ], 404);
        }
        return response()->json([
           $user
        ], 200);
    }

    public function testSoket(Request $request)
    {
        event(
            $e = new CommentEvent([
                'test' => $request->test." ".now()
            ])
        );
        return $request->all();
    }

}
