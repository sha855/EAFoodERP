<?php

namespace App\Enums;

enum FloorPlanEquipment: string
{
    case FLOOR_SCALE = 'Floor scale';
    case TRANSPORT_TROLLEY = 'Transport trolley';
    case HAND_WASH = 'Hand wash';
    case FRIDGE_FOR_WASTE = 'Fridge for waste (+2 - +6C, 2m2)';
    case FRIDGE_FOR_CARCASSES = 'Fridge for carcasses ';
    case FREEZER_FOR_CARCASSES = 'Freezer for carcasses (minimum -18C, 2m2)';
    case FLOOR_SHELF_FOR_SOLIDS = 'Floor shelf for solids';
    case DESK_WITH_A_SINK = 'Desk with a sink (Cold processing of meat)';
    case SINK_TROLLEY = 'Sink trolley (half-product transport)';
    case DESK = 'Desk (Canning)';
    case OVEN = 'Oven';
    case BAKING_TRAY = 'Baking tray shelf on wheels';
    case DESK_COLD = 'Desk (Cold processing of meat)';
    case POT_WASH_SINK = 'Pot wash sink';
    case DISHWASHER = 'Dishwasher';
    case GARBAGE = 'Garbage';
    case FRIDGE_CAPACITY = 'Fridge (+2 - +6C, half-products, 700L)';
    case HOSE_FOR_FLOOR_WASH = 'Hose for floor wash';
    case PUTTING_ON_COVERS = 'Putting on covers';
    case DESK_PACKAGING = 'Desk (Packaging)';

    public static function equipment(): array
    {
        return [
            self::FLOOR_SCALE->value,
            self::TRANSPORT_TROLLEY->value,
            self::HAND_WASH->value,
            self::FRIDGE_FOR_WASTE->value,
            self::FRIDGE_FOR_CARCASSES->value,
            self::FREEZER_FOR_CARCASSES->value,
            self::FLOOR_SHELF_FOR_SOLIDS->value,
            self::DESK_WITH_A_SINK->value,
            self::SINK_TROLLEY->value,
            self::DESK->value,
            self::OVEN->value,
            self::BAKING_TRAY->value,
            self::DESK_COLD->value,
            self::POT_WASH_SINK->value,
            self::DISHWASHER->value,
            self::GARBAGE->value,
            self::FRIDGE_CAPACITY->value,
            self::HOSE_FOR_FLOOR_WASH->value,
            self::PUTTING_ON_COVERS->value,
            self::DESK_PACKAGING->value,
        ];
    }
}
