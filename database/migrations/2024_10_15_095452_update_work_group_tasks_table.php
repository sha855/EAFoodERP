<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateWorkGroupTasksTable extends Migration
{
    public function up()
    {
        Schema::table('work_group_tasks', function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropColumn([
                'company_id',
                'description',
                'is_custom',
                'responsible',
                'outsource',
                'is_required',
            ]);
        });
    }

    public function down()
    {
        Schema::table('work_group_tasks', function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_custom')->default(false);
            $table->string('responsible')->nullable();
            $table->boolean('outsource')->default(false);
            $table->boolean('is_required')->default(false);
            $table->foreign('company_id')->references('id')->on('company_details')->onDelete('cascade');
        });
    }
}
