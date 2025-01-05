<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateManageFoldersTable extends Migration
{
    public function up()
    {
        Schema::create('manage_folders', function (Blueprint $table) {
            $table->id();
            $table->string('menu');
            $table->bigInteger('parent_id')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('manage_folders');
    }
}
