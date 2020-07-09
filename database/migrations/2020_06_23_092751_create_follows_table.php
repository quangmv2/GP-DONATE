<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFollowsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('follows', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id_from');
            $table->unsignedBigInteger('user_id_to');
            $table->timestamps();

            $table->index(['user_id_from', 'user_id_to'], 'index_user_id_follow');
            $table->index(['user_id_from'], 'index_user_id_from_follow');
            $table->index(['user_id_to'], 'index_user_id_to_follow');

            $table->foreign('user_id_from')
                ->references('id')
                ->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');

            $table->foreign('user_id_to')
                ->references('id')
                ->on('users')
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
        Schema::dropIfExists('follows');
    }
}
