<?php

namespace App\Enums;

enum EmployeeOptionsEnum: string
{
    case ONE_TO_TEN = '1-10';
    case ELEVEN_TO_FIFTY = '11-50';
    case FIFTY_ONE_TO_TWO_HUNDRED = '51-200';
    case TWO_HUNDRED_PLUSH = '200+';

    public static function options(): array
    {
        return [
            self::ONE_TO_TEN->value,
            self::ELEVEN_TO_FIFTY->value,
            self::FIFTY_ONE_TO_TWO_HUNDRED->value,
            self::TWO_HUNDRED_PLUSH->value,
        ];
    }
}
