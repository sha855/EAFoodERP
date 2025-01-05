<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('consumer_infos', function (Blueprint $table) {
            $table->dropForeign(['product_recipes_id']);
            $table->dropColumn('product_recipes_id');
            $table->foreignId('product_recipes_id')
                ->constrained('product_recipes')
                ->onDelete('cascade')
                ->after('id');
        });
    }

    public function down(): void
    {
        Schema::table('consumer_infos', function (Blueprint $table) {
            $table->dropForeign(['product_recipes_id']);
            $table->dropColumn('product_recipes_id');
            $table->foreignId('product_recipes_id')
                ->constrained('trace_product_info')
                ->onDelete('cascade');
        });
    }
};
