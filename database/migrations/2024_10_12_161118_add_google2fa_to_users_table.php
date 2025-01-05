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
        Schema::table('users', function (Blueprint $table) {
            $table->string('two_factor_secret')->nullable()->after('password');
            $table->integer('is_two_factor_enabled')->default(0)->after('two_factor_secret');
            $table->json('two_factor_recovery_codes')->nullable()->after('is_two_factor_enabled');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('two_factor_secret');
            $table->dropColumn('is_two_factor_enabled');
            $table->dropColumn('two_factor_recovery_codes');
        });
    }
};
