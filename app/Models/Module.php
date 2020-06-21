<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\User;
use App\Models\Menu;
use App\Models\Quote;

class Module extends Model
{
    use Notifiable;
    protected $table = "modules";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'type', 'location'
    ];

    public function user(){
    	return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function menus() {
        return $this->hasMany(Menu::class, 'menu_id', 'id');
    }

    public function quotes() {
        return $this->belongsToMany(Quote::class, 'module_quote','module_id', 'quote_id');
    }

}
