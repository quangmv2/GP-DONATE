<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Services\UserService;
use App\Services\FollowService;
use App\Services\PostService;


class ProfileController extends Controller
{

    protected $userService;
    protected $followService;
    protected $postService;

    function __construct(UserService $userService, FollowService $followService, PostService $postService){
        $this->middleware('auth:api');
        $this->userService = $userService;
        $this->followService = $followService;
        $this->postService = $postService;
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
     * @SWG\Get(
     *     path="/api/profile/{id}",
     *     tags={"Profile"},
     *     summary={"Profile detail"},
     *     description="Return profile detail by Id",  
     *     @SWG\Parameter(
     *         name="id",
     *         in="path",
     *         type="integer",
     *         description="Length of record need to response",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="OK",
     *         @SWG\Schema(type="object",
    *              @SWG\Property(property="id", type="number", example=1),
    *              @SWG\Property(property="first_name", type="string", example="admin"),
    *              @SWG\Property(property="last_name", type="string", example="admin"),
    *              @SWG\Property(property="username", type="string", example="admin"),
    *              @SWG\Property(property="email", type="string", example="admin@gmail.com"),
    *              @SWG\Property(property="address", type="string", example="Danang, Vietnam"),
    *              @SWG\Property(property="code_id", type="string", example="admincode"),
    *              @SWG\Property(property="personal_photo", type="string", example="..."),
    *              @SWG\Property(property="gender", type="number", example=0),
    *              @SWG\Property(property="created_at", type="string", example="2000-12-03 12:20:20"),
    *              @SWG\Property(property="updated_at", type="string", example="2000-12-03 12:20:20"),
    *              @SWG\Property(property="totalLike", type="number", example=0),
    *              @SWG\Property(property="totalPost", type="number", example=0),
    *              @SWG\Property(property="following", type="number", example=0),
    *              @SWG\Property(property="followed", type="number", example=0),
     *          )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="NotFound Data"
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if ($id=="me") $id = $request->user()->id;
        $user = $this->userService->getUserById($id);
        $posts  = $user->posts;
        $user->roles;
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
        if ($request->user()->id != $id) return response()->json(['message' => 'FORBIDDEN'], 403);
        $this->validate($request, [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => 'required',
            'email' => 'required|email|unique:users,email,'.$id,
            'password' => 'same:confirm-password',
            'roles' => 'required'
        ]);
        $input = $request->all();
        if(!empty($input['password'])){ 
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = array_except($input,array('password'));    
        }

        $user = User::find($id);
        $user->update($input);
        DB::table('model_has_roles')->where('model_id',$id)->delete();
        $user->assignRole($request->input('roles'));
        return redirect()->route('users.index')
                        ->with('success','User updated successfully');
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

    public function getFollowingOfUser(Request $request, $id)
    {
        $follows = $this->followService->getFollowingOfUser($id);
        return response()->json(json_decode($follows), 200);
    }

    public function getFollowedOfUser(Request $request, $id)
    {
        $follows = $this->followService->getFollowedOfUser($id);
        return response()->json(json_decode($follows), 200);
    }

    public function getPostOfUser(Request $request, $id)
    {
        $posts = $this->postService->getPostPaginateByUser(10, $id);
        return response()->json($posts, 200);
    }

    public function followUser(Request $request, $id)
    {
        $follow = $this->followService->userFollowUser($request->user()->id, $id);
        return response()->json(json_decode($follow), 200);
    }
    public function unfollowUser(Request $request, $id)
    {
        $unfollow = $this->followService->userUnfollowUser($request->user()->id, $id);
        return response()->json(json_decode($unfollow), 200);
    }

    public function searchPeople(Request $request)
    {
        $search = $request->get('q');
        $following = $this->followService->getFollowingOfUser($request->user()->id);
        $users = $this->userService->searchUser($search);
        foreach ($users as $key => $user) {
            foreach ($following as $key => $follow) {
                if ($user->id == $follow->user_id_from) {
                    unset($user);
                    break;
                }
                if ($user->id == $follow->user_id_to) {
                    $user["friend"] = true;
                    break;
                }
            }
        }
        return response()->json(json_decode($users), 200);
    }

}
