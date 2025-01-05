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
        Schema::table('teams', function (Blueprint $table) {
            $table->string('email')->nullable()->after('first_last_name');
            $table->string('all_locations')->nullable()->default('Admin')->after('email');
            $table->string('company')->nullable()->after('all_locations');
            $table->string('status')->nullable()->default('Active User')->after('company');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teams', function (Blueprint $table) {
            $table->dropColumn('email');
            $table->dropColumn('all_locations');
            $table->dropColumn('company');
            $table->dropColumn('status');
        });
    }
};
