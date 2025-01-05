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
        Schema::table('ingredients_types', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn(['is_frozen', 'is_chilled', 'is_room_temperature', 'company_id']);
            $table->boolean('is_checkbox')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ingredients_types', function (Blueprint $table) {
            $table->boolean('is_frozen')->default(false);
            $table->boolean('is_chilled')->default(false);
            $table->boolean('is_room_temperature')->default(false);
            $table->foreignId('company_id')->nullable();
            $table->dropColumn('is_checkbox');
        });
    }
};
