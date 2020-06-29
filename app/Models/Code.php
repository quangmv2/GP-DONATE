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
    protected $keyType = 'string';

    // public function user(){
    // 	return $this->hasOn(User::class, 'code_id', 'code');
    // }

    public function user()
    {
        return $this->hasOne(User::class, 'code_id', 'code');
    }
}
