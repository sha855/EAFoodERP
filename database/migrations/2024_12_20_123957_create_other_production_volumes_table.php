<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('other_production_volumes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('food_product_id')->constrained('business_unit_food_product')->onDelete('cascade');
            $table->foreignId('company_id')->constrained('company_details')->onDelete('cascade');
            $table->string('volume');
            $table->string('unit');
            $table->string('period');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('other_production_volumes');
    }
};
