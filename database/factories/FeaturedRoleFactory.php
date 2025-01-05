<?php

namespace Database\Factories;

use App\Models\FeaturedRole;
use Illuminate\Database\Eloquent\Factories\Factory;

class FeaturedRoleFactory extends Factory
{
    protected $model = FeaturedRole::class;

    public function definition(): array
    {

        return [
            'user_id' => null,
            'company_id' => null,
            'name' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
