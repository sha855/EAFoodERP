<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use Illuminate\Database\Seeder;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ingredients = [
            'Composite food and dry food',
            'Drinks',
            'Egg and egg products',
            'Fish and fisheries products',
            'Honey and honey products',
            'Live animals',
            'Meat and meat products',
            'Milk and dairy products',
            'Non-animal products',
            'Purchased ready-to-eat products',
            'Supplement materials',
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create([
                'name' => $ingredient,
                'company_id' => 1,
            ]);
        }
    }
}
