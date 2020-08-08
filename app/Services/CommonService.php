<?php


namespace App\Services;

use DB;
use Hash;
use Response;
use Imagick;
use Illuminate\Support\Facades\Storage;

class CommonService
{
    
    public static function filterArray($input_data){
        if(!$input_data) return;

        $json = json_encode($input_data);
        $json =  preg_replace('/,\s*"[^"]+":null|"[^"]+":null,?/', '', $json);
        return json_decode($json);
    }

    public function saveImage($image)
    {

        // dd($image);
        // return Storage::disk('local')->getAdapter()->getPathPrefix();
        $storage = Storage::disk('local')->getAdapter()->getPathPrefix();
        $size = $image->getSize();  
        $name= time().'_'.$image->getClientOriginalName();
        
        $directory = "uploads/images";

        $path = Storage::putFileAs($directory, $image, $name);
        
        $im = new Imagick($storage.$path);
        // $im->setImageFormat('jpg');

        if ($size > 1000000) {
            $im->setImageCompressionQuality((1000000/$size)*100);
        }
        $newImg = $directory.time().'_'.$image->getClientOriginalName();
        $im->writeImage($storage.$newImg);
        Storage::delete($path);
        return $newImg;
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