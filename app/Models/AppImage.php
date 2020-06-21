<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Module;


class AppImage extends Model
{
    use Notifiable;
    protected $table = "app_images";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'feature_image', 'description'
    ];

}
