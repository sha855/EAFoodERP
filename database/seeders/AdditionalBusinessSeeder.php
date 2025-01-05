<?php

namespace Database\Seeders;

use App\Models\AdditionalBusinessActivity;
use Illuminate\Database\Seeder;

class AdditionalBusinessSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {

        AdditionalBusinessActivity::insert([
            [
                'name' => 'Production and processing of non-animal primary products',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fish and fisheries products production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mixed/compound/composite food production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Meat and meat products production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Milk and dairy products production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Honey and honey products production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Beverage and alcohol production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Egg and egg products production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Other Food and / or Beverage production and processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Food storage/wholesale',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Food Transportation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Selling Food Online',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Takeaway Food Preparation',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Retail (Packaged) Food Sales',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Food Serving (Table Service, Self-Service)',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

    }
}
