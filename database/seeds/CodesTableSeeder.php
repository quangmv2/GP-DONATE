<?php

use Illuminate\Database\Seeder;
use App\Models\Code;

class CodesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $code = Code::create([
            'code' => 'admincode'
        ]);
        $code = Code::create([
            'code' => 'givercode'
        ]);
    }
}
