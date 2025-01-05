<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyFoodProductTable extends Migration
{
    public function up()
    {
        Schema::create('company_food_product', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')
                ->references('id')
                ->on('company_details')
                ->onDelete('cascade');

            $table->unsignedBigInteger('food_product_id');
            $table->foreign('food_product_id')
                ->references('id')
                ->on('business_unit_food_product')
                ->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('company_food_product');
    }
}
