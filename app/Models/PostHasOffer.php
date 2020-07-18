<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostHasOffer extends Model
{
    protected $fillable = [
        'post_id', 'type_offer', 'time', 'content'
    ];
}
