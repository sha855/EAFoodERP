<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasuringUnitsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userId = 1;

        $units = [
            ['name' => 'kilogram', 'symbol' => 'kg', 'value' => 1000, 'user_id' => $userId],
            ['name' => 'gram', 'symbol' => 'g', 'value' => 1, 'user_id' => $userId],
        ];

        DB::table('measuring_units')->insert($units);
    }
}
