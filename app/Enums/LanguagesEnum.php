<?php

namespace App\Enums;

enum LanguagesEnum: string
{
    case ENGLISH = 'English';
    case SPANISH = 'Spanish';
    case FRENCH = 'French';
    case RUSSIAN = 'Russian';

    public function label(): string
    {
        return match ($this) {
            self::ENGLISH => 'English',
            self::SPANISH => 'Spanish',
            self::FRENCH => 'French',
            self::RUSSIAN => 'Russian',
        };
    }
}
