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


class PostService
{

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
            'offer.time' => 'array',
            // 'offer.value' => 'string',
        ]);
    }

    public function getPostPaginate($limit)
    {
        if (empty($limit)) $limit = 1;
        return Post::simplePaginate($limit);       
    }

    public function getPostPaginateByUser($limit, $user_id)
    {
        if (empty($limit)) $limit = 1;
        return Post::where('user_id', $user_id)->simplePaginate($limit);       
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

    public function saveImage($image)
    {
        $name= time().'_'.$image->getClientOriginalName();
        
        $directory = "uploads/images/posts";

        $path = Storage::putFileAs($directory, $image, $name);
        
        return $path;
    }

    public function saveOfferTime($id, $times)
    {
        foreach ($times as $key => $time) {
            PostHasOffer::create([
                'post_id' => $id,
                'type_offer' => 'time',
                'time' => $time
            ]);
        }
    }

    public function saveOfferGoods($id, $content)
    {
        PostHasOffer::create([
            'post_id' => $id,
            'type_offer' => 'good',
            'content' => $content
        ]);
    }

    public function createAndAddHastag($id, $hastags)
    {
        foreach ($hastags as $key => $value) {
            // return $value;
            $hastag = Hastag::updateOrCreate([
                'name' => $value,
            ], []);
            // return $hastag;
            $posthas = PostHasHastag::create([
                'post_id' => $id,
                'hastag_id' => $hastag->id
            ]);
        }
    }

}