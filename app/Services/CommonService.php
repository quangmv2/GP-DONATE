<?php


namespace App\Services;

use DB;
use Hash;
use Response;


class CommonService
{
    
    public static function filterArray($input_data){
        if(!$input_data) return;

        $json = json_encode($input_data);
        $json =  preg_replace('/,\s*"[^"]+":null|"[^"]+":null,?/', '', $json);
        return json_decode($json);
    }


}