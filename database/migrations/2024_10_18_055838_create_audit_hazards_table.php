<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditHazardsTable extends Migration
{
    public function up()
    {
        Schema::create('audit_hazards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('audit_template_id');
            $table->unsignedBigInteger('food_hazard_id');
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('audit_template_id')->references('id')->on('audit_templates')->onDelete('cascade');
            $table->foreign('food_hazard_id')->references('id')->on('food_hazards')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('audit_hazards');
    }
}
