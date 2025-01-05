<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveCompanyIdFromBusinessUnitFoodProductTable extends Migration
{
    public function up()
    {
        Schema::table('business_unit_food_product', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
        });
    }

    public function down()
    {
        Schema::table('business_unit_food_product', function (Blueprint $table) {
            $table->foreignId('company_id')->constrained('company_details')->onDelete('cascade');
        });
    }
}
