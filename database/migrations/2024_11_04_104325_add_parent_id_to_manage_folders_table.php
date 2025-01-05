<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasColumn('manage_folders', 'parent_id')) {
            Schema::table('manage_folders', function (Blueprint $table) {
                $table->bigInteger('parent_id')->default(0)->after('menu');
            });
        }
    }

    public function down(): void
    {
        Schema::table('manage_folders', function (Blueprint $table) {
            $table->dropColumn('parent_id');
        });
    }
};
