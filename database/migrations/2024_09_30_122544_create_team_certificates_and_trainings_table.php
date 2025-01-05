<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('team_certificates_and_trainings', function (Blueprint $table) {
            $table->bigIncrements('id'); // id as bigint auto increment
            $table->unsignedBigInteger('team_member_id'); // team_member_id
            $table->unsignedBigInteger('training_id'); // training_id
            $table->string('certificate_file', 255)->nullable(); // certificate_file
            $table->timestamp('certificate_issue_on')->nullable(); // certificate_issue_on
            $table->timestamp('certificate_valid_until')->nullable(); // certificate_valid_until

            // Foreign key constraints
            $table->foreign('team_member_id')->references('id')->on('teams')->onDelete('cascade');
            $table->foreign('training_id')->references('id')->on('certificates_and_trainings')->onDelete('cascade');
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('team_certificates_and_trainings');
    }
};
