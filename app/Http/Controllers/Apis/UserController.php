<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Code;
use Illuminate\Support\Facades\DB;
use App\Events\CommentEvent;

use App\Models\User;

class UserController extends Controller
{

    
    function __construct(){
        $this->middleware('auth:api');
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
    public function show(Request $req, $id)
    {
        if ($id == 'me')
        {   
            $user = $req->user();
            $user->roles;
            return response()->json(json_decode($user), 200);
        }
        $user = User::findOrFail($id);
        $posts  = $user->posts;
        $user->roles();
        $totalLike = 0;
        foreach ($posts as $key => $post) {
            $totalLike+=$post->likes()->count();
        }
        $user["totalLike"] = $totalLike;
        $user["totalPost"] = $posts->count();
        $user["following"] = $user->following()->count();
        $user["followed"] = $user->followed()->count();
        unset($user["posts"]);
        return response()->json(json_decode($user), 200);
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

    /**
     * @SWG\Post(
     *     path="api/user/me/update-role",
     *     tags={"OAUTH"},
     *     summary={"Role"},
     *     description="Cập nhật Role",  
     *     @SWG\Parameter(
     *         name="role",
     *         in="formData",
     *         type="string",
     *         description="Taker or Giver",
     *         required=true,
     *     ),
     *     
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *            @SWG\Property(property="messafe", type="string", example="success"),
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
     *     @SWG\Response(
     *         response=403,
     *         description="FORBIDDEN",
     *     ),
     * )
     */
    public function updateRole(Request $request)
    {
        $this->validate($request, [
            'role' => 'required|in:giver,taker'
        ]);
        $input = $request->all();
        $role = $request->user()->roles;
        if (count($role) > 0) 
            return abort(response()->json(['message' => 'FORBIDDEN'], 403));
        $request->user()->assignRole($input['role']);
        return response()->json([
            'message' => 'success'
        ], 200);
    }

    /**
     * @SWG\Post(
     *     path="api/user/me/code-invitation",
     *     tags={"OAUTH"},
     *     summary={"Code invitation"},
     *     description="Cập nhật Code invitation",  
     *     @SWG\Parameter(
     *         name="code_invitation",
     *         in="formData",
     *         type="string",
     *         description="code",
     *         required=true,
     *     ),
     *     
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
     *            @SWG\Property(property="messafe", type="string", example="success"),
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
     *     @SWG\Response(
     *         response=403,
     *         description="FORBIDDEN",
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Code not found",
     *     ),
     * )
     */
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
            'message' => 'success'
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
