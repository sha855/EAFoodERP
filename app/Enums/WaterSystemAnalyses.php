<?php

namespace App\Enums;

enum WaterSystemAnalyses: string
{
    case OWN_WELL = 'Own well';
    case CENTRAL_WATER_NETWORK = 'Central Water Network';
    case WATER_TANKS = 'Water Tanks';
    case BOTTLED_WATER = 'Bottled Water';
 

    public static function getOptions(): array
    {
        return [
            self::OWN_WELL->value,
            self::CENTRAL_WATER_NETWORK->value,
            self::WATER_TANKS->value,
            self::BOTTLED_WATER->value,
        ];
    }
}
