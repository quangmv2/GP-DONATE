<?php

use Illuminate\Database\Seeder;
use App\Models\Offer;

class OfferTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $code = Offer::create([
            'offer_value' => 'time'
        ]);
        $code = Offer::create([
            'offer_value' => 'goods'
        ]);
    }
}
