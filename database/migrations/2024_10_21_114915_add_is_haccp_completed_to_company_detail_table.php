<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIsHaccpCompletedToCompanyDetailTable extends Migration
{
    public function up()
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->boolean('is_haccp_completed')->default(false)->after('is_selected');
        });
    }

    public function down()
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->dropColumn('is_haccp_completed');
        });
    }
}
