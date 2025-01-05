<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_product_ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_id');
            $table->string('name');
            $table->timestamps();
            $table->foreign('company_id')
                ->references('id')
                ->on('company_details')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_product_ingredients');
    }
};
