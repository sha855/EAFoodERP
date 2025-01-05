<?php

namespace App\Enums;

enum CertificateAndTrainingFrequencyEnum: string
{
    case TWICE_A_YEAR = 'Twice a year';
    case ONCE_A_YEAR = 'Once a year';
    case AFTER_EVERY_TWO_YEARS = 'After every two years';
    case AFTER_EVERY_THREE_YEARS = 'After every three years';
    case AFTER_EVERY_FOUR_YEARS = 'After every four years';
    case AFTER_EVERY_FIVE_YEARS = 'After every five years';
    case AFTER_EVERY_SIX_YEARS = 'After every six years';
    case WHEN_STARTED_AN_EMPLOYMENT = 'When started an employment';
    case ONCE = 'Once';
    case CUSTOM = 'Custom';
    case NOT_FOUND = 'Not found';
    case TYPE_TO_SEARCH = 'Type to search';

    public function label(): string
    {
        return match ($this) {
            self::TWICE_A_YEAR => 'Twice a year',
            self::ONCE_A_YEAR => 'Once a year',
            self::AFTER_EVERY_TWO_YEARS => 'After every two years',
            self::AFTER_EVERY_THREE_YEARS => 'After every three years',
            self::AFTER_EVERY_FOUR_YEARS => 'After every four years',
            self::AFTER_EVERY_FIVE_YEARS => 'After every five years',
            self::AFTER_EVERY_SIX_YEARS => 'After every six years',
            self::WHEN_STARTED_AN_EMPLOYMENT => 'When started an employment',
            self::ONCE => 'Once',
            self::CUSTOM => 'Custom',
            self::NOT_FOUND => 'Not found',
            self::TYPE_TO_SEARCH => 'Type to search',
        };
    }
}
