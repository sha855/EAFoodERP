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
        Schema::create('consumer_infos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_recipes_id')->constrained('trace_product_info')->onDelete('cascade');
            $table->text('ingredients')->nullable();
            $table->text('consuming_guide')->nullable();
            $table->text('storing_conditions')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consumer_infos');
    }
};
