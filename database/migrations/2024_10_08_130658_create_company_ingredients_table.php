<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_ingredients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('ingredient_id')->constrained('ingredients')->onDelete('cascade');
            $table->foreignId('ingredient_type_id')->constrained('ingredients_types')->onDelete('cascade');
            $table->foreignId('company_id')->constrained('company_details')->onDelete('cascade');
            $table->boolean('is_chilled')->default(false);
            $table->boolean('is_frozen')->default(false);
            $table->boolean('is_room_temperature')->default(false);
            $table->boolean('is_allergen')->default(false);
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
        Schema::dropIfExists('company_ingredients');
    }
}
