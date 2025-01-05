<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('flow_chart_process_steps', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('flow_chart_id');
            $table->foreignId('company_id')->constrained('company_details')->onDelete('cascade');
            $table->string('process_step');
            $table->string('type');
            $table->boolean('is_time')->default(false);
            $table->boolean('is_temperature')->default(false);
            $table->boolean('is_quality')->default(false);
            $table->boolean('is_recording')->default(false);
            $table->text('instruction')->nullable();
            $table->timestamps();
            $table->foreign('flow_chart_id')->references('id')->on('flow_charts')->onDelete('cascade');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('flow_chart_process_steps');
    }
};
