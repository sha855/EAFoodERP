<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_recipes', function (Blueprint $table) {
            $table->id();
            $table->string('product_name');
            $table->string('upc_code')->unique();
            $table->string('product_code')->unique();
            $table->date('expiration_date');
            $table->boolean('is_used_as_ingredient')->default(false);
            $table->enum('product_type', ['purchased', 'our_recipe']);
            $table->enum('expiration_type', ['best_before', 'used_by']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_recipes');
    }
};
