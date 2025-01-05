<?php

namespace App\Enums;

enum ProductExpirationDataEnum: string
{
    case HOURS = 'hours';
    case DAYS = 'days';
    case WEEKS = 'weeks';
    case MONTHS = 'months';
    case YEARS = 'years';

    public function label(): string
    {
        return match ($this) {
            self::HOURS => 'hours',
            self::DAYS => 'days',
            self::WEEKS => 'weeks',
            self::MONTHS => 'months',
            self::YEARS => 'years',
        };
    }
}
