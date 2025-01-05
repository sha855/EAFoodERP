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
        Schema::table('product_recipes', function (Blueprint $table) {
            // Adding nullable foreign key columns to avoid integrity constraint issues
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('company_id')->nullable()->constrained('company_details')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('product_recipes', function (Blueprint $table) {
            // Dropping the foreign key constraints and columns
            $table->dropForeign(['user_id']);
            $table->dropForeign(['company_id']);
        });
    }
};
