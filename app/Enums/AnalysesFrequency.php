<?php

namespace App\Enums;

enum AnalysesFrequency: string
{
    case NOT_DONE = 'not_done';
    case NON_RECURRENT = 'non_recurrent';
    case ANNUALLY = 'annually';
    case TWICE_A_YEAR = 'twice_a_year';
    case FOUR_TIMES_A_YEAR = 'four_times_a_year';
    case WEEKLY = 'Weekly';
    case MONTHLY = 'Monthly';
    case OTHER = 'other';

    public static function getOptions(): array
    {
        return [
            self::NOT_DONE->value => 'Not Done',
            self::NON_RECURRENT->value => 'Non Recurrent',
            self::ANNUALLY->value => 'Annually',
            self::TWICE_A_YEAR->value => 'Twice a Year',
            self::FOUR_TIMES_A_YEAR->value => 'Four Times a Year',
            self::MONTHLY->value,
            self::WEEKLY->value,
            self::OTHER->value => 'Other',
        ];
    }
}
