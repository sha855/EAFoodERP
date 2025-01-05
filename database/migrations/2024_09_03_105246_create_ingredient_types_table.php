<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ingredients_types', function (Blueprint $table) {
            $table->id();
            $table->string('food_temperature_reception');
            $table->boolean('is_frozen')->default(false);
            $table->boolean('is_chilled')->default(false);
            $table->boolean('is_room_temperature')->default(false);
            $table->foreignId('ingredient_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ingredients_types');
    }
};
