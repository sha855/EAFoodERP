<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_work_groups', function (Blueprint $table) {
            $table->id();
            $table->string('task')->nullable();
            $table->string('responsible');
            $table->boolean('is_service_provider')->default(false);
            $table->string('outsourced_service')->nullable();
            $table->boolean('is_required')->default(false);
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('company_id')->constrained('company_details')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_work_groups');
    }
};
