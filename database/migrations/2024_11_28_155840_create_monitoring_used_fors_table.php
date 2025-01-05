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
        Schema::create('monitoring_used_fors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monitoring_task_id')->constrained('monitoring_tasks')->cascadeOnDelete();
            $table->unsignedBigInteger('usefor_id')->nullable();
            $table->string('usefor_type');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring_used_fors');
    }
};
