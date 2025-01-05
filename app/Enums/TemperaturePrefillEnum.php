<?php

namespace App\Enums;

enum TemperaturePrefillEnum: string
{
    case YES = 'Yes';
    case NO = 'No';

    public function label(): string
    {
        return match ($this) {
            self::YES => 'Yes',
            self::NO => 'No',
        };
    }
}
