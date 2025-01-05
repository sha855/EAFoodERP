<?php

namespace App\Enums;

enum DateFormatEnum: string
{
    case DD_MM_YYYY_DOT = 'DD.MM.YYYY';
    case DD_MM_YYYY_SLASH = 'DD/MM/YYYY';
    case MM_DD_YYYY = 'MM/DD/YYYY';

    public function label(): string
    {
        return match ($this) {
            self::DD_MM_YYYY_DOT => 'DD.MM.YYYY',
            self::DD_MM_YYYY_SLASH => 'DD/MM/YYYY',
            self::MM_DD_YYYY => 'MM/DD/YYYY',
        };
    }
}
