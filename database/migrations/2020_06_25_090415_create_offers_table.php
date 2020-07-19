<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('offers', function (Blueprint $table) {
        //     $table->bigIncrements('id');
        //     $table->string('offer_value');
        //     $table->timestamps();
        // });

        Schema::create('post_has_offers', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->unsignedBigInteger('post_id');
            $table->string('type_offer');
            $table->longText('content')->nullable();
            $table->timestamps();

            $table->index(['post_id', 'type_offer'], 'index_post_type_offer_post_has_offer');
            $table->index(['post_id'], 'index_post_id_post_has_offer');
            $table->index(['type_offer'], 'index_type_offer_post_has_offer');
            
            $table->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            // $table->foreign('offer_id')
            //     ->references('id')
            //     ->on('offers')
            //     ->onDelete('cascade')
            //     ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_has_offers');
        // Schema::dropIfExists('offers');
    }
}
