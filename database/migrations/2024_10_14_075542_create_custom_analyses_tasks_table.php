<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomAnalysesTasksTable extends Migration
{
    public function up()
    {
        Schema::create('custom_analyses_tasks', function (Blueprint $table) {
            $table->id();
            $table->string('task_name');
            $table->unsignedBigInteger('company_id');
            $table->string('frequency');
            $table->text('comment');
            $table->string('custom_frequency')->nullable();
            $table->foreign('company_id')->references('id')->on('company_details')->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('custom_analyses_tasks');
    }
}
