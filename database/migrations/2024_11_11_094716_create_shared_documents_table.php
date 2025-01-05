<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('shared_documents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');
            $table->foreignId('company_id')
                ->constrained('company_details')
                ->onDelete('cascade');
            $table->string('name', 255);
            $table->string('email', 255);
            $table->date('access_valid_until');
            $table->integer('haccp_plan')->nullable();
            $table->string('shared_access_token', 255);

            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('shared_documents');
    }
};
