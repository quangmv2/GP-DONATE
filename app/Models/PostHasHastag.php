<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostHasHastag extends Model
{
    protected $fillable = [
        'post_id', 'hastag_id'
    ];
}
