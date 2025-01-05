<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyActiveProcessTable extends Migration
{
    public function up()
    {
        Schema::create('company_active_process', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('process_id');
            $table->unsignedBigInteger('company_id');
            $table->boolean('is_active');
            $table->json('selected_process_activities')->nullable();
            $table->timestamps();
            $table->foreign('process_id')->references('id')->on('processes')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('company_details')->onDelete('cascade');
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('company_active_process');
    }
}
