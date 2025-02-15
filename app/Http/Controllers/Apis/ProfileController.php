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
        $user = $this->userService->getUserByIdOrUsername($id);
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
        $user["isFollow"] = $this->followService->checkFollowUser($request->user()->id, $id);
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
        $user = $this->userService->getUserByIdOrUsername($request->user()->id);
        // if ($request->user()->id != $user->id) return response()->json(['message' => 'FORBIDDEN'], 403);
        if (!empty($request->username) && $request->username == $request->user()->username){
            $this->validate($request, [
                'first_name' => 'required',
                // 'personal_photo' => 'required',
                // 'full_photo' => 'required',
                // 'foudation' => 'required'
            ]);
        } else {
            $this->validate($request, [
                'first_name' => 'required',
                'username' => 'required|unique:users,username',
                // 'personal_photo' => 'required',
                // 'full_photo' => 'required',
                // 'foudation' => 'required'
            ]);
        }
        $input = $request->all();
        if(!empty($input['password'])){ 
            $input['password'] = Hash::make($input['password']);
        }else{
            $input = array_except($input,array('password'));    
        }
        $user->update($input);
        return response()->json(json_decode($user), 200);
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

    public function getLikes(Request $request)
    {
        $likes = $this->userService->getMyLikes($request->user()->id);
        return response()->json(json_decode($likes), 200);
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
        if (empty($id) || $id == "me" || $id == 'undefined') $id = $request->user()->id;
        $posts = $this->postService->getPostPaginateByUser(10, $id);
        return response()->json($posts, 200);
    }

    public function toggleFollowUser(Request $request, $id)
    {
        $check = $this->followService->checkFollowUser($request->user()->id, $id);
        if (!$check) {
            $follow = $this->followService->userFollowUser($request->user()->id, $id);
            return response()->json(json_decode($follow), 201);
        }
        $unfollow = $this->followService->userUnfollowUser($request->user()->id, $id);
        return response()->json(json_decode($unfollow), 200);
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

    public function checkFollowUser(Request $request, $id)
    {
        $check = $this->followService->checkFollowUser($request->user()->id, $id);
        $data = [];
        if ($check) $data["status"] = true;
            else $data["status"] = false;
        return response()->json(($data), 200);
    }

    public function searchPeople(Request $request)
    {
        $search = $request->get('q');
        $following = $this->followService->getFollowingOfUser($request->user()->id);
        $users = $this->userService->searchUser($search);
        foreach ($users as $key => $user) {
            if (empty($user->code_id)) $user["isCeleb"] = false;
             else $user["isCeleb"] = true;
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
