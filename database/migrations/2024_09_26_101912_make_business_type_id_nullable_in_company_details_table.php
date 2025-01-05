<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->unsignedBigInteger('business_type_id')->nullable()->change();
            $table->string('total_no_of_employees')->nullable()->change();
            $table->string('total_no_of_business_locations')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->unsignedBigInteger('business_type_id')->nullable(false)->change();
            $table->string('total_no_of_employees')->nullable(false)->change();
            $table->string('total_no_of_business_locations')->nullable(false)->change();
        });
    }
};
