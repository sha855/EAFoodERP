<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCustomProcessesTable extends Migration
{
    public function up()
    {
        Schema::create('custom_processes', function (Blueprint $table) {
            $table->id();
            $table->string('process_name');
            $table->unsignedBigInteger('company_id');
            $table->boolean('is_active_process')->default(true);
            $table->text('additional_info')->nullable();
            $table->boolean('is_active_add_info')->default(true);
            $table->text('hazard_info')->nullable();
            $table->boolean('is_active_hazard_info')->default(true);
            $table->softDeletes();
            $table->timestamps();
            $table->foreign('company_id')->references('id')->on('company_details')->onDelete('cascade');

        });
    }

    public function down()
    {
        Schema::dropIfExists('custom_processes');
    }
}
