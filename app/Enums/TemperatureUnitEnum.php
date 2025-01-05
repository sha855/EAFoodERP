<?php

namespace App\Enums;

enum TemperatureUnitEnum: string
{
    case CELSIUS = 'Celsius';
    case FAHRENHEIT = 'Fahrenheit';

    public function label(): string
    {
        return match ($this) {
            self::CELSIUS => 'Celsius',
            self::FAHRENHEIT => 'Fahrenheit',
        };
    }
}
