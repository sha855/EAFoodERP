<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyAnalysesTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_analyses_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained('company_details')->onDelete('cascade');
            $table->string('frequency');
            $table->text('comment')->nullable();
            $table->text('custom_frequency')->nullable();
            $table->foreignId('analyses_task_id')->constrained('analyses_tasks')->onDelete('cascade');
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
        Schema::dropIfExists('company_analyses_tasks');
    }
}
