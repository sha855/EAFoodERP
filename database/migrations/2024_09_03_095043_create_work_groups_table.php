<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('work_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignId('task_id')->nullable();
            $table->string('responsible');
            $table->boolean('is_service_provider')->default(false);
            $table->boolean('outsourced_service')->default(false);
            $table->boolean('is_required')->default(false);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('work_groups');
    }
};
