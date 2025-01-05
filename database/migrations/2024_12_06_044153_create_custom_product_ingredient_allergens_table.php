<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_product_ingredient_allergens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('custom_product_ingredient_id');
            $table->string('allergen');
            $table->timestamps();
            $table->foreign('custom_product_ingredient_id', 'cpi_allergen_fk')
                ->references('id')
                ->on('custom_product_ingredients')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_product_ingredient_allergens');
    }
};
