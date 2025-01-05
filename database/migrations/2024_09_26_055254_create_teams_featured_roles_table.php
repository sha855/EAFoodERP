<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teams_featured_roles', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('team_member_id');
            $table->unsignedBigInteger('featured_role_id');
            $table->foreign('team_member_id')->references('id')->on('teams')->onDelete('cascade');
            $table->foreign('featured_role_id')->references('id')->on('featured_roles')->onDelete('cascade');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_featured_roles');
    }
};
