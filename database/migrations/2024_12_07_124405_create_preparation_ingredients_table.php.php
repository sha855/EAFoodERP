<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePreparationIngredientsTable extends Migration
{

    public function up()
    {
        Schema::create('preparation_ingredients', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_preparation_id');
            $table->foreign('product_preparation_id')
                ->references('id')
                ->on('product_preparation')
                ->onDelete('cascade');
            $table->unsignedBigInteger('add_ingredient_id');
            $table->foreign('add_ingredient_id')
                ->references('id')
                ->on('add_ingredients')
                ->onDelete('cascade');
            $table->string('batch_no', 100)->nullable();
            $table->date('expiry_date')->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('unit', 50)->nullable();

            $table->timestamps();
        });
    }


    public function down()
    {
        Schema::dropIfExists('preparation_ingredients');
    }
}
