<?php

namespace App\Enums;

enum Roles: string
{
    case MANAGEMENT = 'Management';
    case COOKS = 'Cooks';
    case CLEANING = 'Cleaning';
    case MAINTENANCE = 'Maintenance';
    case DELIVERY = 'Delivery';
    case CUSTOMER_SERVICE = 'Customer service';

    public static function options(): array
    {
        return [
            self::MANAGEMENT->value,
            self::COOKS->value,
            self::CLEANING->value,
            self::MAINTENANCE->value,
            self::DELIVERY->value,
            self::CUSTOMER_SERVICE->value,
        ];
    }
}
