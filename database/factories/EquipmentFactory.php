<?php

namespace Database\Factories;

use App\Models\Equipment;
use Illuminate\Database\Eloquent\Factories\Factory;

class EquipmentFactory extends Factory
{
    protected $model = Equipment::class;

    public function definition(): array
    {
        return [
            'name' => null,
            'sensor_id' => $this->faker->bothify('EQ-SENSOR-##??'),
            'type' => $this->faker->randomElement(['Storage', 'Washing', 'Dishwasher', 'Packaging', 'Hot storage', 'Cold storage (freezer)']),
            'room_id' => null,
            'below' => $this->faker->optional()->numberBetween(0, 50),
            'above' => $this->faker->optional()->numberBetween(51, 100),
            'allowed' => $this->faker->optional()->numberBetween(20, 80),
            'is_use' => true,
            'company_id' => null,
        ];
    }
}
