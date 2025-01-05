<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductPreparationTable extends Migration
{

    public function up()
    {
        Schema::create('product_preparation', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')->references('id')->on('product_recipes')->onDelete('cascade');
            $table->decimal('amount', 10, 2)->nullable();
            $table->decimal('volume', 10, 2)->nullable();
            $table->date('expiry_date')->nullable();
            $table->time('expiry_time')->nullable();
            $table->string('batch_code', 100)->nullable();
            $table->text('comment')->nullable();
            $table->unsignedBigInteger('company_id');
            $table->foreign('company_id')->references('id')->on('company_details')->onDelete('cascade');

            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('product_preparation');
    }
}
