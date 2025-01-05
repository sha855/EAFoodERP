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
        Schema::table('add_ingredients', function (Blueprint $table) {
            $table->dropForeign(['trace_product_info_id']);
            $table->foreign('trace_product_info_id', 'trace_product_info')
                ->references('id')->on('trace_product_info')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('add_ingredients', function (Blueprint $table) {
            $table->dropForeign('trace_product_info');
            $table->foreign('trace_product_info_id')
                ->references('id')->on('trace_product_info')
                ->onDelete('cascade');
        });
    }
};
