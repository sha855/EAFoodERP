<?php

namespace Database\Seeders;

use App\Models\BusinessUnitFoodProduct;
use Illuminate\Database\Seeder;

class BusinessUnitFoodProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['name' => 'Salads', 'description' => null],
            ['name' => 'Snacks', 'description' => 'Different pre-courses, snacks'],
            ['name' => 'Sandwiches and sandwich cakes', 'description' => null],
            ['name' => 'Sushi', 'description' => null],
            ['name' => 'Warm first courses', 'description' => null],
            ['name' => 'Soups', 'description' => null],
            ['name' => 'Vegetable dishes', 'description' => null],
            ['name' => 'Minced meat', 'description' => 'Meat, minced or ground in any other way using an appropriate device and containing up to 1% of salt'],
            ['name' => 'Fish dishes', 'description' => null],
            ['name' => 'Meat dishes', 'description' => 'Dishes from meat'],
            ['name' => 'Side dishes', 'description' => 'Rice, buckwheat, potato, pasta, etc.'],
            ['name' => 'Sauces', 'description' => null],
            ['name' => 'Pasta, risotto, casserole', 'description' => null],
            ['name' => 'Pizza', 'description' => null],
            ['name' => 'Desserts', 'description' => null],
            ['name' => 'Bakery products', 'description' => 'Bread, white bread, waffles, cookies, crackers, gingerbreads, rusks, crispbread, cakes'],
            ['name' => 'Pastry products, sweets', 'description' => 'Candies, marzipan, sweets, cookies, chocolate'],
            ['name' => 'Hot drinks', 'description' => null],
            ['name' => 'Cold drinks', 'description' => 'Juices, dairy products, water, alcohol'],
            ['name' => 'Bought-in products in original package', 'description' => 'E.g. drinks, sweets, ready-to-eat food, etc.'],
            ['name' => 'Raw meat', 'description' => 'Uncooked meat (incl. flavoured)'],
            ['name' => 'Raw fish- and fisheries products', 'description' => 'Uncooked fish (incl. flavoured)'],
            ['name' => 'Fruits (in bulk/repackaged)', 'description' => 'packed/collected by customer/seller'],
            ['name' => 'Vegetables and mushrooms (in bulk/repackaged)', 'description' => 'packed/collected by customer/seller'],
            ['name' => 'Berries (in bulk/repackaged)', 'description' => 'packed/collected by customer/seller'],
            ['name' => 'Nuts, seeds (in bulk/repackaged)', 'description' => 'packed/collected by customer/seller'],
            ['name' => 'Dry food (in bulk/repackaged)', 'description' => 'Dry food, e.g. sugar, salt, oat flakes, other flakes, breakfast flakes, muesli, millet groats, flour, bran'],
            ['name' => 'Spices (in bulk/repackaged)', 'description' => 'all spices, herbs, vinegar, soda, baking powders, dry yeast, bakery wares, starches, vegetable gelling agents'],
            ['name' => 'Ice cream cocktails/ frozen yoghurt/ milk product based smoothies', 'description' => null],
            ['name' => 'Fruit and vegetable smoothies', 'description' => 'Refreshing smoothies packed with vitamins.'],
            ['name' => 'Ice cream (in bulk/repackaged)', 'description' => null],
            ['name' => 'Freshly squeezed juices', 'description' => 'Fresh juices made from the finest fruits.'],
            ['name' => 'Sweets (in bulk/repackaged)', 'description' => null],
            ['name' => 'Milk and milk products (in bulk/repackaged)', 'description' => null],
            ['name' => 'Egg and egg products (in bulk/repackaged)', 'description' => null],
            ['name' => 'Sweet pastry products', 'description' => 'profiteroles, lemon tart, strudel, apple pie etc'],
            ['name' => 'Savoury pastry products', 'description' => 'sausage roll, meat pie, samosas etc'],
            ['name' => 'Ready-to-eat food (in bulk/repackaged)', 'description' => 'Convenient ready-to-eat meals for busy days.'],
            ['name' => 'Dumplings, Bao buns', 'description' => 'Fluffy bao buns and dumplings with savory fillings.'],
            ['name' => 'Food intolerance related products' , 'description'=> 'e.g. gluten, lactose free products'],
        ];

        foreach ($products as $product) {
            BusinessUnitFoodProduct::insert([
                'product' => $product['name'],
                'description' => $product['description'],
                'is_active' => rand(0, 1),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
