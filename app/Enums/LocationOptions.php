<?php

namespace App\Enums;

enum LocationOptions: string
{
    case ONE_TO_FIVE = '1-5';
    case SIX_TO_TWENTY = '6-20';
    case TWENTY_ONE_TO_FIFTY = '21-50';
    case FIFTY_PLUS = '50+';

    public static function options(): array
    {
        return [
            self::ONE_TO_FIVE->value,
            self::SIX_TO_TWENTY->value,
            self::TWENTY_ONE_TO_FIFTY->value,
            self::FIFTY_PLUS->value,
        ];
    }
}
