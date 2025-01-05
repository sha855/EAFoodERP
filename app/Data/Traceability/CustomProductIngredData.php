<?php

namespace App\Data\Traceability;

use App\Models\CustomProductIngredient;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CustomProductIngredData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('required', 'integer')]
        public int $companyId,

        #[Rule('required', 'string')]
        public string $ingredient,

        #[Rule('array')]
        public array $allergens = []
    ) {}

    public static function formModel(CustomProductIngredient $info): self
    {
        return new self(
            id  : $info->id,
            companyId : $info->company_id,
            ingredients: $info->ingredients,
            allergen : $info->allergens,
        );
    }

    public static function messages(): array
    {
        return [
            'ingredients.required' => __('Validation/consumerInfo.ingredients.required'),
            'ingredients.string' => __('Validation/consumerInfo.ingredients.string'),
            'allergen.array' => __('Validation/consumerInfo.allergen.array'),
            'allergen.min' => __('Validation/consumerInfo.allergen.min'),
        ];
    }
}
