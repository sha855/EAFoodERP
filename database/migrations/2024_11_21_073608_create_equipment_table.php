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
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sensor_id')->nullable();
            $table->string('type');
            $table->foreignId('room_id')->nullable()->constrained('rooms')->cascadeOnDelete();
            $table->integer('below')->nullable();
            $table->integer('above')->nullable();
            $table->integer('allowed')->nullable();
            $table->boolean('is_use')->default(true);
            $table->foreignId('company_id')->nullable()->constrained('company_details')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
