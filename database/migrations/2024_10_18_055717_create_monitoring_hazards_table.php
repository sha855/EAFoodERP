<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonitoringHazardsTable extends Migration
{
    public function up()
    {
        Schema::create('monitoring_hazards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('food_hazard_id');
            $table->unsignedBigInteger('monitoring_task_id');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('food_hazard_id')->references('id')->on('food_hazards')->onDelete('cascade');
            $table->foreign('monitoring_task_id')->references('id')->on('monitoring_tasks')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('monitoring_hazards');
    }
}
