<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use App\Models\Post;
use App\Models\Hastag;
use App\Models\PostHasOffer;
use App\Models\PostHasHastag;
use Illuminate\Support\Facades\Storage;
use App\Services\UserService;


class PostService
{

    function __construct(UserService $userService){
        $this->userService = $userService;
    }

    public function validate($request)
    {
        $request->validate([
            'title' =>'required',
            // 'content' =>'required',  
            'photo_thumbnail' => 'required',
            'full_photo' => 'required',
            'due_day' => 'required|date|date_format:"Y-m-d"|after:now',
            'offer' => 'required',
            'offer.type' => 'required|in:time,goods',
        ]);
    }

    public function getPostPaginate($limit)
    {
        if (empty($limit)) $limit = 1;
        return Post::orderBy('created_at', 'desc')->simplePaginate($limit);       
    }

    public function getPostPaginateByUser($limit, $user_id)
    {
        if (empty($limit)) $limit = 1;
        $user = $this->userService->getUserByIdOrUsername($user_id);
        return Post::where('user_id', $user->id)->simplePaginate($limit);       
    }

    public function save($title, $content, $photo_thumbnail, $full_photo, $due_day, $user_id)
    {
        $post = new Post();
        $post->title = $title;
        $post->content = $content;
        $post->photo_thumbnail = $photo_thumbnail;
        $post->full_photo = $full_photo;
        $post->due_day = $due_day;
        $post->user_id = $user_id;
        $post->save();
        return $post;
    }

    public function update($id, $update)
    {
        $post = Post::findOrFail($id);
        $post->update($update);
        return $post;
    }

    public function delete($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return response()->json(["message" => "success"], 200);
    }

    public function saveOfferTime($id, $times)
    {
        PostHasOffer::create([
            'post_id' => $id,
            'type_offer' => 'time',
            'content' => $times
        ]);
    }

    public function saveOfferGoods($id, $content)
    {
        PostHasOffer::create([
            'post_id' => $id,
            'type_offer' => 'goods',
            'content' => $content
        ]);
    }

    public function createAndAddHastag($id, $hastags)
    {
        foreach ($hastags as $key => $value) {
            // return $value;
            $hastag = Hastag::updateOrCreate([
                'value' => $value,
            ], []);
            // return $hastag;
            $posthas = PostHasHastag::create([
                'post_id' => $id,
                'hastag_id' => $hastag->id
            ]);
        }
    }

    public function searchPost($search)
    {
        $result = Post::join('post_has_hastags', 'post_has_hastags.post_id', '=', 'posts.id')
                    ->join('hastags', 'hastags.id', '=', 'post_has_hastags.hastag_id')
                    ->where('hastags.value', 'like', '%'.$search.'%')
                    ->orWhere('posts.title', 'like', '%'.$search.'%')
                    ->distinct()
                    ->orderBy('posts.created_at', 'desc')
                    ->select('posts.*')
                    ->simplePaginate(10);
        return $result;
    }

}