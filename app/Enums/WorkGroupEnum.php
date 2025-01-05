<?php

namespace App\Enums;

enum WorkGroupEnum: string
{
    case RESPONSIBLE_FOR_FOOD_SAFETY = 'Responsible for food safety plan updates';
    case CONTRACT_NEGOTIATIONS_SUPPLIER_RELATION = 'Contract negotiations/supplier relations';
    case EMPLOYEES_TRAINING = 'Employees training';
    case DAILY_HEALTH_CHECK = 'Daily health check';
    case ORDERS_DELIVERIES_STORAGE_STOCKTAKE = 'Orders, deliveries, storage, stocktake';
    case FOOD_HANDLING_CONTROL_QUALITY_MANAGEMENT = 'Food handling control and quality management';
    case MAINTENANCE_OF_ROOMS_AND_DEVICES = 'Maintenance of rooms and devices';
    case WASTE_MANAGEMENT = 'Waste management';
    case PEST_CONTROL = 'Pest control';
    case CLEANING_DISINFECTION_MANAGEMENT = 'Cleaning and disinfection management';
    case CUSTOMERS_COMPLAINTS_MANAGEMENT = 'Customers’ complaints management';

    public static function labels(): array
    {
        return [
            self::RESPONSIBLE_FOR_FOOD_SAFETY->value,
            self::CONTRACT_NEGOTIATIONS_SUPPLIER_RELATION->value,
            self::EMPLOYEES_TRAINING->value,
            self::DAILY_HEALTH_CHECK->value,
            self::ORDERS_DELIVERIES_STORAGE_STOCKTAKE->value,
            self::FOOD_HANDLING_CONTROL_QUALITY_MANAGEMENT->value,
            self::MAINTENANCE_OF_ROOMS_AND_DEVICES->value,
            self::WASTE_MANAGEMENT->value,
            self::PEST_CONTROL->value,
            self::CLEANING_DISINFECTION_MANAGEMENT->value,
            self::CUSTOMERS_COMPLAINTS_MANAGEMENT->value,
        ];
    }
}
