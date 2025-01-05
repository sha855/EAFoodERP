<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('work_group_tasks', function (Blueprint $table) {

            $table->unsignedBigInteger('company_id')->nullable()->after('id');
            $table->boolean('is_custom')->default(false)->after('description');
            $table->string('outsource')->nullable()->after('is_custom');

            $table->foreign('company_id')->references('id')->on('company_details')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::table('work_group_tasks', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
            $table->dropColumn('is_custom');
            $table->dropColumn('outsource');
        });
    }
};
