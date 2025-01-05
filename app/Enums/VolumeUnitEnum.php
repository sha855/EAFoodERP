<?php

namespace App\Enums;

enum VolumeUnitEnum: string
{
    case LITERS = 'Liters';
    case GALLONS = 'Gallons';

    public function label(): string
    {
        return match ($this) {
            self::LITERS => 'Liters',
            self::GALLONS => 'Gallons',
        };
    }
}
