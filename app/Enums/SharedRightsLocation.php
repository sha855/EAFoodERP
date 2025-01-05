<?php

namespace App\Enums;

enum SharedRightsLocation: string
{
    case READ_ONLY = 'Read-only';
    case NO_ACCESS = 'No access';
    case ADMIN = 'Admin';

    public static function options(): array
    {
        return [
            self::NO_ACCESS->value,
            self::READ_ONLY->value,
            self::ADMIN->value,
        ];
    }
}
