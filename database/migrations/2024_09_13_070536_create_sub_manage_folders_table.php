<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubManageFoldersTable extends Migration
{
    public function up()
    {
        Schema::create('sub_manage_folders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('manage_folders')->onDelete('cascade');
            $table->string('sub_menu');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('sub_manage_folders');
    }
}
