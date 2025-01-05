<?php

namespace App\Enums;

enum FrequencyEnum: string
{
    case YES_SLASH_NO = 'yes/no';
    case ZERO_ONE_TWO = '0,1,2';
    case ONE_TO_FIVE = '1,2,3,4,5';

    public function label(): string
    {
        return match ($this) {
            self::YES_SLASH_NO => 'yes,no',
            self::ZERO_ONE_TWO => '0,1,2',
            self::ONE_TO_FIVE => '1,2,3,4,5',
        };
    }
}
