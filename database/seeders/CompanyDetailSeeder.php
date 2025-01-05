<?php

namespace Database\Seeders;

use App\Models\CompanyDetail;
use Illuminate\Database\Seeder;

class CompanyDetailSeeder extends Seeder
{
    public function run()
    {
        CompanyDetail::factory()->count(2)->create();
    }
}
