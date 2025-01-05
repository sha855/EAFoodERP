<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->string('preferred_language')->nullable();
            $table->string('volume_units')->nullable();
            $table->string('weight_units')->nullable();
            $table->string('email')->nullable();
            $table->string('temperature_unit')->nullable();
            $table->string('monitoring')->nullable();
            $table->string('temperature_prefill')->nullable();
            $table->string('date_format')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('company_details', function (Blueprint $table) {
            $table->dropColumn([
                'email',
                'preferred_language',
                'volume_units',
                'weight_units',
                'temperature_unit',
                'monitoring',
                'temperature_prefill',
                'date_format',
            ]);
        });
    }
};
