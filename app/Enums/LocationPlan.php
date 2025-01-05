<?php

namespace App\Enums;

enum LocationPlan: string
{
    case BUILDING = 'Building';
    case INGREDIENT_ENTRY = 'Ingredient entry';
    case EMPLOYEES_ENTRY_MORNINGS = 'Employees entry (mornings)';
    case WASTE_EXIT_EVENINGS = 'Waste exit (evenings)';
    case CUSTOMER_ENTRY = 'Customer entry';
    case PRODUCTION_EXIT = 'Production exit';
    case WASTE_STORAGE_ON_TERRITORY = 'Waste storage on territory';
    case GENERAL_WATER_SUPPLY_SPOT = 'General water supply spot';
    case ENTRY_AND_EXIT_ROADS = 'Entry and exit roads';

    public static function getInputFields(): array
    {
        return [
            self::BUILDING->value,
            self::INGREDIENT_ENTRY->value,
            self::EMPLOYEES_ENTRY_MORNINGS->value,
            self::WASTE_EXIT_EVENINGS->value,
            self::CUSTOMER_ENTRY->value,
            self::PRODUCTION_EXIT->value,
            self::WASTE_STORAGE_ON_TERRITORY->value,
            self::GENERAL_WATER_SUPPLY_SPOT->value,
        ];
    }

    public static function getRouteFields(): array
    {
        return [
            self::ENTRY_AND_EXIT_ROADS->value,
        ];
    }
}
