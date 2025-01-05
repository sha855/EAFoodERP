<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuditsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('audits', function (Blueprint $table) {
            $table->id();
            $table->string('auditor');
            $table->date('audit_date');
            $table->string('auditee')->nullable();
            $table->string('file_path')->nullable();
            $table->unsignedBigInteger('audit_template_id')->nullable();
            $table->foreign('audit_template_id')->references('id')->on('audit_templates')->onDelete('set null'); // Ensure foreign key allows null
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('audits');
    }
}
