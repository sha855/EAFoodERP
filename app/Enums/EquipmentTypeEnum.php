<?php

namespace App\Enums;

enum EquipmentTypeEnum: string
{
    case STORAGE = 'Storage';
    case WASHING = 'Washing';
    case DISHWASHER = 'Dishwasher';
    case MEASURING_EQUIPMENT = 'Measuring equipment';
    case HEAT_TREATMENT = 'Heat treatment';
    case COLD_PROCESSING = 'Cold processing';
    case COLD_STORAGE_FREEZER = 'Cold storage (freezer)';
    case COLD_STORAGE_FRIDGE = 'Cold storage (fridge)';
    case HOT_STORAGE = 'Hot storage';
    case TRANSPORT_EQUIPMENT = 'Transport equipment';
    case PACKAGING = 'Packaging';
    case OTHER = 'Other';
}
