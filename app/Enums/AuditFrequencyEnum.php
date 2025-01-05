<?php

namespace App\Enums;

enum AuditFrequencyEnum: string
{
    case ONCE_QUARTER = 'Once a quarter';
    case ONCE_YEAR = 'Once a year';
    case TWICE_YEAR = 'Twice a year';

    public function label(): string
    {
        return match ($this) {
            self::ONCE_QUARTER => 'Once a quarter',
            self::ONCE_YEAR => 'Once a year',
            self::TWICE_YEAR => 'Twice a year',
        };
    }
}
