<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHastagTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hastags', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('value')->unique();
            $table->timestamps();
        });

        Schema::create('post_has_hastags', function (Blueprint $table) {

            $table->bigIncrements('id');
            $table->unsignedBigInteger('post_id');
            $table->unsignedBigInteger('hastag_id');
            $table->timestamps();

            $table->index(['post_id', 'hastag_id'], 'post_id_hastag_id_index');
            
            $table->foreign('post_id')
            ->references('id')
            ->on('posts')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            
            $table->foreign('hastag_id')
            ->references('id')
            ->on('hastags')
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
        Schema::dropIfExists('post_has_hastags');
        Schema::dropIfExists('hastags');
    }
}
