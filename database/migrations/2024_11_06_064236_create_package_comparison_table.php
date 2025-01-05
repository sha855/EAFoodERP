<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePackageComparisonTable extends Migration
{
    public function up()
    {
        Schema::create('package_comparisons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('package_id')
                ->constrained('packages')
                ->onDelete('cascade');
            $table->foreignId('feature_id')
                ->constrained('package_features')
                ->onDelete('cascade');
            $table->foreignId('feature_heading_id')
                ->constrained('feature_headings')
                ->onDelete('cascade');
            $table->boolean('is_active')->default(false);
            $table->string('optional_act')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('plans_features');
    }
}
