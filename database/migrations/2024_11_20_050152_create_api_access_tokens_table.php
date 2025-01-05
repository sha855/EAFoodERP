<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('api_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('company_id');
            $table->string('name', 255);
            $table->string('api_access_token', 255);
            $table->timestamps();
            $table->softDeletes();

            $table->index('user_id', 'api_access_tokens_user_id_foreign');
            $table->index('company_id', 'api_access_tokens_company_id_foreign');

            $table->foreign('user_id', 'api_access_tokens_user_id_foreign')
                ->references('id')->on('users')
                ->onDelete('cascade');
            $table->foreign('company_id', 'api_access_tokens_company_id_foreign')
                ->references('id')->on('company_details')
                ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('api_access_tokens');
    }
};
