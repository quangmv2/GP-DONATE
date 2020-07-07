<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Illuminate\Support\Facades\Storage;



class CommonService
{
    
    public static function filterArray($input_data){
        if(!$input_data) return;

        $json = json_encode($input_data);
        $json =  preg_replace('/,\s*"[^"]+":null|"[^"]+":null,?/', '', $json);
        return json_decode($json);
    }

    public function showImage($path)
    {
        $fileName = $path;

        if (!Storage::exists($fileName)) 
            return response()->json(['message' => 'Image not found'], 401);

        $headers = [
            'Cache-Control'         => 'must-revalidate, post-check=0, pre-check=0',
            'Content-Type'          => Storage::mimeType($fileName),
            'Content-Length'        => Storage::size($fileName),
            'Content-Disposition'   => 'filename="' . basename($fileName) . '"',
            'Pragma'                => 'public',
        ];
        return Storage::download($fileName, basename($fileName), $headers);
    }

}