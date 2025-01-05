<?php

namespace App\Enums;

enum FlowChartEnum: string
{
    case Input = 'input';
    case Default = 'default';

    public static function initialNodes(): array
    {
        return [
            [
                'id' => '1',
                'type' => 'custom',
                'data' => [
                    'process_step' => 'Receiving the products',
                    'type' => 'CP',
                    'is_temperature' => '1',
                    'is_quality' => '1',
                    'is_recording' => '1',
                    'instruction' => '1 - Chilled food and foodstuff at 0...+ 6 . 2 - Frozen food and foodstuff below -18C.',
                ],
                'position' => ['x' => 250, 'y' => 150],
                'className' => 'flow-node',
            ],
            [
                'id' => '2',
                'type' => 'custom',
                'data' => [
                    'process_step' => 'Storing products',
                    'type' => 'PRP',
                    'is_temperature' => '0',
                    'is_quality' => '1',
                    'is_recording' => '0',
                    'instruction' => '1 - on site ( reusable tableware ) . 2 - Take away sales (Thermal Boxes).',
                ],
                'position' => ['x' => 250, 'y' => 300],
                'className' => 'flow-node',
            ],
            [
                'id' => '3',
                'type' => 'custom',
                'data' => [
                    'process_step' => 'Thawing/defrosting',
                    'type' => 'CCP',
                    'is_temperature' => '1',
                    'is_quality' => '1',
                    'is_recording' => '0',
                    'instruction' => '1 - Thawing at +2..+6`c (cookies, plates of lasagna) upto 24 hours',
                ],
                'position' => ['x' => 250, 'y' => 450],
                'className' => 'flow-node',
            ],
        ];
    }

    public static function initialEdges(): array
    {
        return [
            ['id' => 'e1-2', 'source' => '1', 'target' => '2', 'type' => self::Default->value, 'animated' => true],
            ['id' => 'e2-3', 'source' => '2', 'target' => '3', 'type' => self::Default->value, 'animated' => true],
            ['id' => 'e3-4', 'source' => '3', 'target' => '4', 'type' => self::Default->value, 'animated' => true],
        ];
    }
}
