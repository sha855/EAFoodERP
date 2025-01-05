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
        Schema::create('add_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trace_product_info_id')->constrained('product_recipes')->onDelete('cascade');
            $table->string('ingredient');
            $table->decimal('amount', 10, 2);
            $table->string('unit');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('add_ingredients');
    }
};
