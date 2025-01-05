<?php

namespace App\Enums;

enum WeightUnitsEnum: string
{
    case KILOGRAM = 'Kilograms';
    case POUNDS = 'Pounds';

    public function label(): string
    {
        return match ($this) {
            self::KILOGRAM => 'Kilograms',
            self::POUNDS => 'Pounds',
        };
    }
}
