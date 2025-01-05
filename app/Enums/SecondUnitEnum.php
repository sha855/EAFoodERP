<?php

namespace App\Enums;

enum SecondUnitEnum: string
{
    case CHOOSE = 'Choose';
    case KILOGRAM = 'kilogram';
    case GRAM = 'gram';
    case CUP = 'cup';
    case TABLESPOON = 'tablespoon';
    case TEASPOON = 'teaspoon';
    case POUND = 'pound';
    case OUNCE = 'Ounce';

    public function label(): string
    {
        return match ($this) {
            self::CHOOSE => 'Choose',
            self::KILOGRAM => 'kilogram',
            self::GRAM => 'gram',
            self::CUP => 'cup',
            self::TABLESPOON => 'tablespoon',
            self::TEASPOON => 'teaspoon',
            self::POUND => 'pound',
            self::OUNCE => 'Ounce',
        };
    }
}
