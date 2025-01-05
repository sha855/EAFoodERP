<?php

namespace App\Enums;

enum MonitoringTaskSetupEnum: string
{
    case EQUIPMENT = 'equipment';
    case ROOMS = 'rooms';
    case NONE = 'none';
    case A_DETAILED_TASK = 'a_detailed_task';
    case A_CHECKLIST = 'a_checklist';

    private const FREQUENCY = [
        'annually' => 'Annually',
        'month' => 'Once a month',
        'week' => 'Once a week',
        'day' => 'Once a day',
        'not_specified' => 'Not specified',
        'custom' => 'Custom',
    ];

    private const CUSTOM_TYPE = [
        'times_a_day' => 'Times a day',
        'days' => 'Days',
        'weeks' => 'Weeks',
        'months' => 'Months',
        'years' => 'Years',
    ];

    public static function fields(): array
    {
        return [
            'temperature' => 'Enter temperature',
            'date' => 'Enter date',
            'time' => 'Enter time',
            'amount' => 'Enter amount',
            'text' => 'Enter text',
            'numeric' => 'Enter numeric value',
            'multiple_answer' => 'Choose multiple answers',
            'one_answer' => 'Choose one answer',
            'product' => 'Choose product',
            'photo_file' => 'Attach a photo/file',
            'ticket' => 'Create ticket',
            'timer' => 'Timer',
        ];
    }

    public static function taskDetails(): array
    {
        return [
            'frequency' => self::FREQUENCY,
            'frequencyVerification' => array_filter(self::FREQUENCY, fn ($key) => $key !== 'annually' && $key !== 'not_specified' && $key !== 'custom', ARRAY_FILTER_USE_KEY),
            'customType' => self::CUSTOM_TYPE,
        ];
    }

    public static function taskRelatedOptions(): array
    {
        return [
            self::EQUIPMENT->value => [
                'label' => 'Equipment',
                'description' => 'Use the same task for several pieces of equipment (like measuring temperature of several refrigerators). You may want to edit your list of Equipment in the Setup first.',
            ],
            self::ROOMS->value => [
                'label' => 'Rooms',
                'description' => 'Use the same task for several rooms (like cleaning the floor of several rooms). You may want to edit your list of Rooms from the Rooms Setup first.',
            ],
            self::NONE->value => [
                'label' => 'None',
                'description' => 'This task is not related to specific rooms nor equipment.',
            ],
        ];
    }

    public static function type(): array
    {
        return [
            self::A_DETAILED_TASK->value => [
                'label' => 'A detailed task',
                'toolTip' => 'A detailed task can be built using different input fields like temperature, date, weight, etc.',
                'description' => 'Can be built using different input fields like temperature, date, weight, etc.',
            ],
            self::A_CHECKLIST->value => [
                'label' => 'A checklist',
                'toolTip' => 'A checklist is a list of tasks that users can check as done.',
                'description' => 'Is a list of tasks that users can check as done.',
            ],
        ];
    }

    public static function checklistNoneList(): array
    {
        return [
            'Set tables with place settings',
            'Clean and sanitize the windows, tables, and surfaces',
            'Clean the bathroom thoroughly',
            'Fold napkins and place table settings',
            'Restock tabletop necessities (sugar packets, jam and butter, ketchup, etc)',
            'Restock drinks at the bar',
            'Set up mise en place at the bar',
            'Stock the bar with clean glassware',
        ];
    }
}
