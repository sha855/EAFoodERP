<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('active_process_steps', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable()->after('process_activity_id');
            $table->foreign('company_id')
                ->references('id')
                ->on('company_details')
                ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('active_process_steps', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
        });
    }
};
