<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessUnitFoodProductTable extends Migration
{
    public function up()
    {
        Schema::create('business_unit_food_product', function (Blueprint $table) {
            $table->id();
            $table->string('product');
            $table->foreignId('company_id')->constrained('company_details')->onDelete('cascade');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('business_unit_food_product');
    }
}
