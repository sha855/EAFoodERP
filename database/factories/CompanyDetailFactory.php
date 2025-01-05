<?php

namespace Database\Factories;

use App\Models\CompanyDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompanyDetailFactory extends Factory
{
    protected $model = CompanyDetail::class;

    public function definition()
    {
        return [
            'user_id' => 2,
            'is_selected' => 1,
            'company_name' => $this->faker->company,
            'country_name' => $this->faker->country,
            'total_no_of_employees' => $this->faker->numberBetween(1, 500),
            'business_type_id' => $this->faker->numberBetween(1, 5),
            'total_no_of_business_locations' => $this->faker->numberBetween(1, 10),
            'company_registration_number' => $this->faker->bothify('REG-#####'),
            'registration_number' => $this->faker->bothify('RN-######'),
            'vat_no' => $this->faker->bothify('VAT-######'),
            'address' => $this->faker->address,
            'email' => $this->faker->unique()->safeEmail,
            'preferred_language' => $this->faker->randomElement(['en', 'fr', 'de', 'es']),
            'volume_units' => $this->faker->randomElement(['liters', 'gallons']),
            'weight_units' => $this->faker->randomElement(['kilograms', 'pounds']),
            'temperature_unit' => $this->faker->randomElement(['celsius', 'fahrenheit']),
            'monitoring' => $this->faker->boolean,
            'temperature_prefill' => $this->faker->boolean,
            'date_format' => $this->faker->randomElement(['Y-m-d', 'd/m/Y']),
        ];
    }
}
