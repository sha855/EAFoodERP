<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audit_questions', function (Blueprint $table) {
            $table->id();
            $table->string('questions');
            $table->unsignedBigInteger('audit_template_id');
            $table->foreign('audit_template_id')->references('id')->on('audit_templates')->onDelete('cascade');
            $table->integer('selected_score')->nullable();
            $table->text('comments')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('audit_questions');
    }
};
