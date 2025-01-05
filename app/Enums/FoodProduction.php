<?php

namespace App\Enums;

enum FoodProduction: string
{
    case VOLUME_1_15 = '1-15';
    case VOLUME_16_150 = '16-150';
    case VOLUME_151_500 = '151-500';
    case VOLUME_501_1000 = '501-1000';
    case VOLUME_1001_PLUS = '1001+';

    case UNIT_PORTION = 'Portion/Ptn';
    case UNIT_KILOGRAM = 'Kilogram';
    case UNIT_LITRE = 'Litre';
    case UNIT_MILLILITER = 'Milliliter';
    case UNIT_GRAM = 'Gram';

    case PERIOD_ANNUALLY = 'Annually';
    case PERIOD_DAILY = 'Daily';
    case PERIOD_MONTHLY = 'Monthly';
    case PERIOD_WEEKLY = 'Weekly';

    public static function estimatedVolumes(): array
    {
        return [
            self::VOLUME_1_15->value,
            self::VOLUME_16_150->value,
            self::VOLUME_151_500->value,
            self::VOLUME_501_1000->value,
            self::VOLUME_1001_PLUS->value,
        ];
    }

    public static function units(): array
    {
        return [
            self::UNIT_PORTION->value,
            self::UNIT_KILOGRAM->value,
            self::UNIT_LITRE->value,
            self::UNIT_MILLILITER->value,
            self::UNIT_GRAM->value,
        ];
    }

    public static function periods(): array
    {
        return [
            self::PERIOD_ANNUALLY->value,
            self::PERIOD_DAILY->value,
            self::PERIOD_MONTHLY->value,
            self::PERIOD_WEEKLY->value,
        ];
    }
}
