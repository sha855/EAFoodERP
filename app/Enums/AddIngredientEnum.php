<?php

namespace App\Enums;

enum AddIngredientEnum: string
{
    case START_TYPING_TO_ADD_AN_INGREDIENT = 'Start typing to add an ingredient';
    case GRAIN_FLAKES_7 = '7 grain flakes';
    case GRAIN_FLAKES_8 = '8 grain flakes';
    case ADZUKI_BEANS_GERMS = "Adzuki beans'germs";
    case AGAR = 'Agar';
    case AGAVE_SYRUP = 'Agave syrup';
    case ALFALFA_SPROUTS = 'Alfalfa sprouts';
    case ALOND_BUTTER = 'Almond butter';

    public function label(): string
    {
        return match ($this) {
            self::START_TYPING_TO_ADD_AN_INGREDIENT => 'Start typing to add an ingredient',
            self::GRAIN_FLAKES_7 => '7 grain flakes',
            self::GRAIN_FLAKES_8 => '8 grain flakes',
            self::ADZUKI_BEANS_GERMS => "Adzuki beans'germs",
            self::AGAR => 'Agar',
            self::AGAVE_SYRUP => 'Agave syrup',
            self::ALFALFA_SPROUTS => 'Alfalfa sprouts',
            self::ALOND_BUTTER => 'Almond butter',
        };
    }
}
