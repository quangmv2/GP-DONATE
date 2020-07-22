<?php

namespace App\Http\Controllers\Apis;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\LikeService;
use App\Services\NotificationService;

class LikeController extends Controller
{

    private $likeService;

    function __construct(LikeService $likeService, NotificationService $notificationService){
        $this->likeService = $likeService;
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $post_id = $request->get('post_id');
        if (empty($post_id)) abort(response()->json(['message' => 'NotFound'], 404));
        $likes = $this->likeService->getLikeOfPost($post_id);
        return response()->json(json_decode($likes), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->likeService->validate($request);
        $like = $this->likeService->save($request->post_id, $request->user()->id);
        return response()->json(json_decode($like), 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
    public function destroy(Request $request, $id)
    {
        $like = $this->likeService->delete($id, $request->user()->id);
        return response()->json(json_decode($like), 200);
    }
}
