<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('location_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('file_path');
            $table->foreignId('company_id')
                ->constrained('company_details')
                ->onDelete('cascade');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('location_plan');
    }
};
