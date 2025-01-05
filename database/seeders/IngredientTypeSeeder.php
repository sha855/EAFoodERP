<?php

namespace Database\Seeders;

use App\Models\Ingredient;
use App\Models\IngredientsType;
use Illuminate\Database\Seeder;

class IngredientTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ingredientTypes = [
            'Composite food and dry food' => [
                'analogue products', 'Desserts', 'non-emulsified sauces', 'emulsified sauces', 'Allergen icon', 'special food', 'infant and children food', 'baby milk formula', 'Allergen icon', 'pastry products', 'Allergen icon', 'canned food, preserves', 'Dry food', 'simple bakery products', 'additives', 'additives (e-additives)', 'spices', 'pasta products', 'Allergen icon', 'powdered food', 'bouillon', 'yeast', 'Mustard and products', 'Allergen icon', 'doughs', 'food ice', 'Food additives', 'food fat, oils', 'vinegar', 'selected bakery products', 'rice', 'dried beans', 'Allergen icon', 'Allergens',
            ],

            'Drinks' => [
                'cocoa and cocoa products', 'coffee', 'tea', 'alcohol', 'bottled water (still)', 'tap water', 'mineral water', 'soft drinks, tonics', 'juice, juice drinks, nectar', 'tree juice', 'concentrates, syrups',
            ],

            'Egg and egg products' => [
                'chicken eggs', 'quail eggs', 'other eggs', 'Allergen icon', 'egg products',
            ],

            'Fish and fisheries products' => [
                'frozen fish products', 'flavoured fish products', 'Allergen icon', 'smoked fish products', 'Allergen icon', 'caviar', 'Allergen icon', 'Fish and fisheries products', 'Allergen icon', 'molluscs and crustaceans', 'Allergen icon', 'Allergen icon', 'Allergens',
            ],

            'Honey and honey products' => [
                'honey', 'honey products', 'honey based products',
            ],

            'Live animals' => [
                'Fish',
                'Molluscs and crustaceans',

            ],
            'Meat and meat products' => [
                'Minced meat', 'Meat products', 'Meat preparations', 'animal stomach, liver, bladder, intestines, lungs', 'chicken meat', 'emu meat', 'goose meat', 'deer meat', 'horse meat', 'ostrich meat', 'game bird', 'rabbit meat', 'turkey meat', 'bear meat', 'goat meat', 'beaver meat', 'domestic fowl', 'coney meat', 'Lamb meat', 'roe meat', 'wild boar meat', 'muskrat meat', 'rodent meat', 'duck', 'bison meat', 'elk meat', 'partridge', 'pork meat', 'game (other) meat', 'beef meat', 'quail', 'animal raw fat',
            ],

            'Milk and dairy products' => [
                'fermented dairy products', 'cheese and cheese products', 'ice cream', 'curd and curd products', 'condensed milk', 'skimmed milk', 'milk', 'milk desserts, puddings', 'milk and milk powder', 'coffee cream 10-20%', 'raw milk', 'whey and whey products', 'butter >82%', 'butter mix <82%', 'non-animal milks', 'cream 35-40%',
            ],

            'Non-animal products' => [
                'sprouted seeds, sprouts', 'vegetables', 'herbs', 'berries', 'fruit and berry ice', 'fruits', 'seeds, nuts', 'mushrooms', 'mushroom products', 'soy and soy products', 'grain', 'sesame products', 'celery', 'lupine',
            ],

            'Purchased ready-to-eat products' => [
                'ready-to-eat food
',
            ],
            'Supplement materials' => [
                'powdered food',
            ],
        ];

        foreach ($ingredientTypes as $ingredientName => $types) {
            $ingredient = Ingredient::where('name', $ingredientName)->first();

            if ($ingredient) {
                foreach ($types as $type) {
                    IngredientsType::create([
                        'food_temperature_reception' => $type,
                        'ingredient_id' => $ingredient->id,
                    ]);
                }
            }
        }
    }
}
