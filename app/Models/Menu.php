<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Module;


class Menu extends Model
{
    use Notifiable;
    protected $table = "menus";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content'
    ];

    public function module(){
    	return $this->belongsTo(Module::class, 'module_id', 'id');
    }

}
