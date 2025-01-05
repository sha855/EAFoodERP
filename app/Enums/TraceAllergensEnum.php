<?php

namespace App\Enums;

enum TraceAllergensEnum: string
{
    case MILK = 'Milk';
    case EGG = 'Egg';
    case FISH = 'Fish';
    case CRUSTACEAN_SHELLFISH = 'Crustacean shellfish';
    case TREE_NUTS = 'Tree nuts';
    case PEANUT = 'Peanut';
    case WHEAT = 'Wheat';
    case SOYBEANS = 'Soybeans';
    case SULFITES_10MG_OR_MORE = 'Sulfites ≥10 mg/kg';
    case SESAME = 'Sesame';
    case CEREALS_WITH_GLUTEN = 'Cereals with gluten';
    case MOLLUSCAN_SHELLFISH = 'Molluscan shellfish';
    case MUSTARD = 'Mustard';
    case BEE_POLLEN = 'Bee pollen/propolis';
    case ROYAL_JELLY = 'Royal jelly';
    case CELERY = 'Celery';
    case LUPIN = 'Lupin';

    public static function label(): array
    {
        return [
            self::MILK->value,
            self::EGG->value,
            self::FISH->value,
            self::CRUSTACEAN_SHELLFISH->value,
            self::TREE_NUTS->value,
            self::PEANUT->value,
            self::WHEAT->value,
            self::SOYBEANS->value,
            self::SULFITES_10MG_OR_MORE->value,
            self::SESAME->value,
            self::CEREALS_WITH_GLUTEN->value,
            self::MOLLUSCAN_SHELLFISH->value,
            self::MUSTARD->value,
            self::BEE_POLLEN->value,
            self::ROYAL_JELLY->value,
            self::CELERY->value,
            self::LUPIN->value,
        ];
    }
}
