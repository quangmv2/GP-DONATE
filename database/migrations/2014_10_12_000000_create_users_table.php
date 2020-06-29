<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::create('codes', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('used')->default(false);
            $table->string('code')->unique();
            $table->timestamps();

            // $table->primary(['code', 'id']);

            $table->index(['id'], 'index_codes_id');
            $table->index(['code'], 'index_codes');

        });

        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('email')->unique();
            $table->string('address')->nullable();
            $table->unsignedBigInteger('code_id')->nullable();
            $table->string('personal_photo')->nullable();
            $table->integer('gender');
            $table->rememberToken();
            $table->timestamps();

            // $table->foreign('code_id')
            //     ->references('id')
            //     ->on('codes')
            //     ->onDelete('cascade');
            $table->foreign('code_id')
                ->references('id')
                ->on('codes')
                ->onDelete('set null')
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
        Schema::dropIfExists('users');
        Schema::dropIfExists('codes');
    }
}
