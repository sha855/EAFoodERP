<?php

namespace App\Enums;

enum FloorPlanType: string
{
    case WATER_AND_SEWERAGE = 'Water and Sewerage Floor Plan';
    case FLOOR_PLAN = 'Floor Plan';
    case EQUIPMENT_FLOOR_PLAN = 'Equipment Floor Plan';
    case ENTRANCES_AND_EXITS = 'Entrances and Exits Floor Plan';
    case PEST_CONTROL_FLOOR_PLAN = 'Waste ,Tare, Pest Control Floor Plan';

    public static function label(): array
    {
        return [
            self::WATER_AND_SEWERAGE->value,
            self::FLOOR_PLAN->value,
            self::EQUIPMENT_FLOOR_PLAN->value,
            self::ENTRANCES_AND_EXITS->value,
            self::PEST_CONTROL_FLOOR_PLAN->value,
        ];
    }
}
