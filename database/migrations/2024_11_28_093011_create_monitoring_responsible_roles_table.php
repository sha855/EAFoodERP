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
        Schema::create('monitoring_responsible_roles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monitoring_task_id')->constrained('monitoring_tasks')->cascadeOnDelete();
            $table->string('task_related')->nullable();
            $table->boolean('is_assign_task')->default(false);
            $table->foreignId('assign_task_to')->nullable()->constrained('featured_roles')->cascadeOnDelete();
            $table->string('frequency')->nullable();
            $table->boolean('is_frequency')->default(false);
            $table->json('custom')->nullable();
            $table->boolean('allow_not_done')->default(false);
            $table->boolean('can_skip')->default(false);
            $table->integer('room_equipment_id')->comment('data_id')->nullable();
            $table->string('checklist_task_title')->nullable();
            $table->string('name')->nullable();
            $table->boolean('is_multiple')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring_responsible_roles');
    }
};
