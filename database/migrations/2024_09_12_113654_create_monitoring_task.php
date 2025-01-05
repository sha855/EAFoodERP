<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('monitoring_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->string('task_related');
            $table->string('summary');
            $table->longText('instructions_editor');
            $table->foreignId('company_id')->nullable()->constrained('company_details')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users')->cascadeOnDelete();
            $table->boolean('is_verification')->default(false);
            $table->foreignId('verifier')->nullable()->comment('verifier for verification')->constrained('featured_roles')->cascadeOnDelete();
            $table->string('frequency')->nullable()->comment('verification');
            $table->boolean('is_enabled')->default(true);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('monitoring_tasks');
    }
};
