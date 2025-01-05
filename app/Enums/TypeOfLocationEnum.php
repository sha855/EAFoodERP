<?php

namespace App\Enums;

enum TypeOfLocationEnum: string
{
    case KISKO = 'Kisko';
    case TRAILER = 'Trailer';
    case GHOST_KITCHEN = 'Ghost Kitchen';
    case STAND = 'Stand';
    case OTHER = 'Other';

    public function label(): string
    {
        return match ($this) {
            self::KISKO => 'Kisko',
            self::TRAILER => 'Trailer',
            self::GHOST_KITCHEN => 'Ghost Kitchen',
            self::STAND => 'Stand',
            self::OTHER => 'Other',
        };
    }
}
