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
        Schema::create('product_recipes_image', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_recipes_id')->constrained('product_recipes')->onDelete('cascade');
            $table->string('image_name');
            $table->string('image_path');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_recipes_image');
    }
};
