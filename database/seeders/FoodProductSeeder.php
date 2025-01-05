<?php

namespace Database\Seeders;

use App\Models\FoodProduct;
use Illuminate\Database\Seeder;

class FoodProductSeeder extends Seeder
{
    public function run(): void
    {
        FoodProduct::create([
            'name' => 'Product 1',
            'description' => 'Description for Product 1',
        ]);

        FoodProduct::create([
            'name' => 'Product 2',
            'description' => 'Description for Product 2',
        ]);
    }
}
