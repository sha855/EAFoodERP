<?php

namespace App\Enums;

enum MapPoints: string
{
    case BUILDING = 'Building';
    case INGREDIENT_ENTRY = 'Ingredient entry';
    case EMPLOYEES_ENTRY_MORNINGS = 'Employees entry (mornings)';
    case WASTE_EXIT_EVENINGS = 'Waste exit (evenings)';
    case CUSTOMER_ENTRY = 'Customer entry';
    case PRODUCTION_EXIT = 'Production exit';
    case WASTE_STORAGE_ON_TERRITORY = 'Waste storage on territory';
    case GENERAL_WATER_SUPPLY_SPOT = 'General water supply spot';
}
