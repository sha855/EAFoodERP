<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('floor_plans', function (Blueprint $table) {
            $table->id();
            $table->string('floor_plan')->nullable();
            $table->unsignedBigInteger('company_id');
            $table->boolean('is_active')->default(true);
            $table->foreign('company_id')
                ->references('id')
                ->on('company_details')
                ->onDelete('cascade');
            $table->softDeletes();
            $table->timestamps();

        });
    }

    public function down()
    {
        Schema::dropIfExists('floor_plans');
    }
};
