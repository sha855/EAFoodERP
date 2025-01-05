<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('product_recipes', function (Blueprint $table) {
            $table->renameColumn('expiration_date', 'expiration');
            $table->integer('expiration')->change();
        });
    }

    public function down(): void
    {
        Schema::table('product_recipes', function (Blueprint $table) {
            $table->date('expiration')->change();
            $table->renameColumn('expiration', 'expiration_date');
        });
    }
};
