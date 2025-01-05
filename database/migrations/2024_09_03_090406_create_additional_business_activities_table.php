<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('additional_business_activities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('food_business_type_id')->constrained('food_business_types')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('additional_business_activities');
    }
};
