<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sub_manage_files', function (Blueprint $table) {
            $table->dropForeign(['sub_menu_id']);
        });
        Schema::dropIfExists('sub_manage_folders');
    }

    public function down(): void
    {
        Schema::create('sub_manage_folders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('menu_id')->constrained('manage_folders')->onDelete('cascade');
            $table->string('sub_menu');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::table('sub_manage_files', function (Blueprint $table) {
            $table->foreign('sub_menu_id')->references('id')->on('sub_manage_folders')->onDelete('cascade');
        });
    }
};
