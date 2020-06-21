<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Module;


class Quote extends Model
{
    use Notifiable;
    protected $table = "quotes";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'quote', 'feature_image', 'author'
    ];

    public function module(){
    	return $this->belongsTo(Module::class, 'module_id', 'id');
    }

    public function modules() {
        return $this->belongsToMany(Module::class, 'module_quote', 'module_id', 'quote_id');
    }

}
