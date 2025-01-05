<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->dropForeign('business_units_food_business_unit_id_foreign');
            $table->dropForeign('business_units_customer_group_id_foreign');
            $table->string('food_business_unit_id')->nullable()->change();
            $table->string('customer_group_id')->nullable()->change();
            $table->string('custom_business_unit')->nullable()->after('food_business_unit_id');
            $table->string('custom_customer_group')->nullable()->after('customer_group_id');
        });
    }

    public function down(): void
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->dropColumn('custom_business_unit');
            $table->dropColumn('custom_customer_group');
            $table->foreignId('food_business_unit_id')->nullable()->constrained('food_business_units')->change();
            $table->foreignId('customer_group_id')->nullable()->constrained('main_customers')->change();
            $table->foreign('food_business_unit_id')->references('id')->on('food_business_units')->onDelete('set null');
            $table->foreign('customer_group_id')->references('id')->on('main_customers')->onDelete('set null');
        });
    }
};
