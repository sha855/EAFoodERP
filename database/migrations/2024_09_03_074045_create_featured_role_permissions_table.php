<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('featured_role_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('feature_role_id')->constrained('featured_roles')->onDelete('cascade');
            $table->foreignId('feature_permission_id')->constrained('featured_permissions')->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('featured_role_permissions');
    }
};
