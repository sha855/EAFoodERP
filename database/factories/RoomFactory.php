<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    protected $model = Room::class;

    public function definition(): array
    {
        return [
            'name' => null,
            'type' => $this->faker->randomElement(['Food delivery', 'Food preparation', 'Chemical storage', 'Storage', 'General']),
            'area' => $this->faker->numberBetween(10, 500),
            'sensor_id' => $this->faker->bothify('SENSOR-##??'),
            'below' => $this->faker->optional()->numberBetween(0, 100),
            'above' => $this->faker->optional()->numberBetween(101, 200),
            'allowed' => $this->faker->optional()->numberBetween(50, 150),
            'is_use' => true,
            'company_id' => null,
        ];
    }
}
