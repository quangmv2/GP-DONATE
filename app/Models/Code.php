<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Code extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'used', 'code'
    ];

    protected $primaryKey = 'code';

    public function user(){
    	return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
