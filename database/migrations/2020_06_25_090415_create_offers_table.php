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
        Schema::create('offers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('offer_value');
            $table->timestamps();
        });

        Schema::create('post_has_offer', function (Blueprint $table) {
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('offer_id');
            $table->timestamps();

            $table->primary(['post_id', 'offer_id']);
            $table->index(['post_id', 'offer_id'], 'index_post_offer_id_post_has_offer');
            $table->index(['post_id'], 'index_post_id_post_has_offer');
            $table->index(['offer_id'], 'index_offer_id_post_has_offer');
            
            $table->foreign('post_id')
                ->references('id')
                ->on('posts')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('offer_id')
                ->references('id')
                ->on('offers')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_has_offer');
        Schema::dropIfExists('offers');
    }
}
