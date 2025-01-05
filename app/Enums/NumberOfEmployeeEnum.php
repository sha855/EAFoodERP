<?php

namespace App\Enums;

enum NumberOfEmployeeEnum: string
{
    case ONETOTHREE = '1-3';
    case FOURTOFOURTEEN = '4-14';
    case FIFTEENPLUS = '15+';

    public function label(): string
    {
        return match ($this) {
            self::ONETOTHREE => '1-3',
            self::FOURTOFOURTEEN => '4-14',
            self::FIFTEENPLUS => '15+',
        };
    }
}
