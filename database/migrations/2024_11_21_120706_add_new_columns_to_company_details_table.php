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
        Schema::table('company_details', function (Blueprint $table) {
            $table->string('phone')->nullable();
            $table->string('representative_person')->nullable();
            $table->string('work_email_for_notification')->nullable();
            $table->string('time_zone')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->dropColumn(['phone', 'representative_person', 'work_email_for_notification', 'time_zone']);
        });
    }
};
