<?php

namespace App\Enums;

enum MonitoringEnum: string
{
    case ENABLED = 'Enabled';
    case DISABLED = 'Disabled';

    public function label(): string
    {
        return match ($this) {
            self::ENABLED => 'Enabled',
            self::DISABLED => 'Disabled',
        };
    }
}
