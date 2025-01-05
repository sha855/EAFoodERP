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
        Schema::create('pause_monitorings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('analyses_task_id')->nullable();
            $table->unsignedBigInteger('monitoring_task_id')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('company_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('analyses_task_id')->references('id')->on('analyses_tasks')->onDelete('set null');
            $table->foreign('monitoring_task_id')->references('id')->on('monitoring_tasks')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pause_monitorings');
    }
};
