<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodHazardsTable extends Migration
{
    public function up()
    {
        Schema::create('food_hazards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('custom_process_id');
            $table->unsignedBigInteger('company_id');
            $table->text('potential_hazards')->nullable();
            $table->string('hazards_type')->nullable();
            $table->integer('likelihood')->nullable();
            $table->integer('severity')->nullable();
            $table->string('risk_level')->nullable();
            $table->text('justification_decision')->nullable();
            $table->text('preventive_measure')->nullable();
            $table->text('critical_limit')->nullable();
            $table->text('corrective_action')->nullable();
            $table->text('verification')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('custom_process_id')
                ->references('id')->on('custom_processes')
                ->onDelete('cascade');
            $table->foreign('company_id')
                ->references('id')->on('company_details')
                ->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('food_hazards');
    }
}
