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
        Schema::create('monitoring_task_associations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monitoring_task_id')->constrained('monitoring_tasks')->cascadeOnDelete();
            $table->string('associable_type');
            $table->json('fields')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring_task_associations');
    }
};
