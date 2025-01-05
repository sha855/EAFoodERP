<?php

namespace App\Enums;

enum FirstUnitEnum: string
{
    case UNIT = 'Unit';
    case KILOGRAM = 'kilogram';
    case GRAM = 'gram';
    case CUP = 'cup';
    case TABLESPOON = 'tablespoon';
    case TEASPOON = 'teaspoon';

    public function label(): string
    {
        return match ($this) {
            self::UNIT => 'Unit',
            self::KILOGRAM => 'kilogram',
            self::GRAM => 'gram',
            self::CUP => 'cup',
            self::TABLESPOON => 'tablespoon',
            self::TEASPOON => 'teaspoon',
        };
    }
}
