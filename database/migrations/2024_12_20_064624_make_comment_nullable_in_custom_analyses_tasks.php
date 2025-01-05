<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeCommentNullableInCustomAnalysesTasks extends Migration
{
    public function up()
    {
        Schema::table('custom_analyses_tasks', function (Blueprint $table) {
            $table->text('comment')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('custom_analyses_tasks', function (Blueprint $table) {
            $table->text('comment')->nullable(false)->change();
        });
    }
}
