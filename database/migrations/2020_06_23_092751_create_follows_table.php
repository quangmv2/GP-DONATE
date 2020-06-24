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

        if (Schema::hasTable('follows')) {
            Schema::dropIfExists('follows');
        }
        Schema::create('follows', function (Blueprint $table) {
            $table->bigIncrements('id_follow');
            $table->bigInteger('id_user_from');
            $table->bigInteger('id_user_to');
            $table->timestamps();
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
