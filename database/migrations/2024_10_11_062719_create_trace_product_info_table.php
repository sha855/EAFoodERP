<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trace_product_info', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_recipes_id')->constrained('product_recipes')->onDelete('cascade');
            $table->decimal('recipe_total_amount', 10, 2);
            $table->string('recipe_total_amount_unit');
            $table->decimal('one_portion_amount', 10, 2);
            $table->string('one_portion_amount_unit');
            $table->text('preparation_instructionst')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trace_product_info');
    }
};
