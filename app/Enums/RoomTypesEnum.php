<?php

namespace App\Enums;

enum RoomTypesEnum: string
{
    case FOOD_DELIVERY = 'Food delivery';
    case FOOD_PREPARATION = 'Food preparation';
    case FOOD_PRODUCTION = 'Food production';
    case SANITARY_CLEANING = 'Sanitary/cleaning';
    case SALES = 'Sales';
    case CHEMICAL_STORAGE = 'Chemical storage';
    case COLD_STORAGE_FREEZER = 'Cold storage (freezer room)';
    case COLD_STORAGE_COLD_ROOM = 'Cold storage (cold room)';
    case STORAGE = 'Storage';
    case GENERAL = 'General';
    case VEHICLE = 'Vehicle';
    case OTHER = 'Other';
}
