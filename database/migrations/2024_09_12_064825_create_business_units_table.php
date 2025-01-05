<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('business_units', function (Blueprint $table) {
            $table->id();
            $table->string('unit_name');
            $table->string('address');
            $table->integer('phone');
            $table->string('manager');
            $table->foreignId('food_business_type_id')->nullable();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('additional_business_activity_id')->constrained('additional_business_activities')->nullable();
            $table->boolean('is_organic')->default(false);
            $table->foreignId('food_business_unit_id')->constrained('food_business_units')->nullable();
            $table->foreignId('customer_group_id')->constrained('main_customers')->nullable();
            $table->integer('average_number_of_customer')->nullable();
            $table->boolean('is_terrace')->default(false);
            $table->integer('number_of_seats')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('business_units');
    }
};
