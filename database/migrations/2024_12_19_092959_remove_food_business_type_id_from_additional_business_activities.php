<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('additional_business_activities', function (Blueprint $table) {
            $table->dropForeign(['food_business_type_id']);
            $table->dropColumn('food_business_type_id');
        });
    }

    public function down(): void
    {
        Schema::table('additional_business_activities', function (Blueprint $table) {
            $table->foreignId('food_business_type_id')->constrained('food_business_types')->onDelete('cascade');
        });
    }
};
