<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('floor_plan_files', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('file_path')->nullable();
            $table->unsignedBigInteger('floor_plan_id');
            $table->foreign('floor_plan_id')
                ->references('id')
                ->on('floor_plans')
                ->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('floor_plan_files');
    }
};
