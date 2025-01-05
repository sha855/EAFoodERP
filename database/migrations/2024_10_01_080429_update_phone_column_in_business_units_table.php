<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdatePhoneColumnInBusinessUnitsTable extends Migration
{
    public function up()
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->bigInteger('phone')->change();
        });
    }

    public function down()
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->string('phone', 15)->change();
        });
    }
}
