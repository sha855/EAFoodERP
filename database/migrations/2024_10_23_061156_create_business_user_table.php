<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBusinessUserTable extends Migration
{
    public function up()
    {
        Schema::create('business_users', function (Blueprint $table) {
            $table->id();
            $table->string('full_name', 255);
            $table->string('company_name', 255);
            $table->string('work_email', 255)->nullable();
            $table->string('business_type_name');
            $table->enum('total_no_of_employees', ['1-10', '11-50', '51-200', '201-500', '501+']);
            $table->string('stdcode');
            $table->string('phone');
            $table->string('document_url')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('company_registrations');
    }
}
