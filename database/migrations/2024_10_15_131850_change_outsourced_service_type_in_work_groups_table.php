<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('work_groups', function (Blueprint $table) {
            $table->string('outsourced_service')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('work_groups', function (Blueprint $table) {
            $table->boolean('outsourced_service')->default(false)->change();
        });
    }
};
