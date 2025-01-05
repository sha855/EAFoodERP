<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStdCodesTable extends Migration
{
    public function up()
    {
        Schema::create('std_codes', function (Blueprint $table) {
            $table->id();
            $table->string('stdcode');
            $table->string('country');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('std_codes');
    }
}
