<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->dropForeign(['additional_business_activity_id']);
            $table->dropColumn('additional_business_activity_id');
            $table->text('additional_business_activity_id')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('business_units', function (Blueprint $table) {
            $table->dropColumn('additional_business_activity_id');
            $table->string('additional_business_activity_id')->nullable();
            $table->foreign('additional_business_activity_id')
                ->references('id')
                ->on('additional_business_activities')
                ->onDelete('set null');
        });
    }
};
