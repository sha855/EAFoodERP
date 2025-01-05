<?php

namespace App\Enums;

enum SharedRights: string
{
    case MONITORING = 'Monitoring';
    case NO_ACCESS = 'No access';
    case ADMIN = 'Admin';

    public static function options(): array
    {
        return [
            self::NO_ACCESS->value,
            self::MONITORING->value,
            self::ADMIN->value,
        ];
    }
}
