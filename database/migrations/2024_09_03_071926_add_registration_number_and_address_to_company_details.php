<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->string('company_registration_number')->nullable()->after('total_no_of_business_locations');
            $table->string('address')->nullable()->after('company_registration_number');
        });
    }

    public function down(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->dropColumn(['company_registration_number', 'address']);
        });
    }
};
