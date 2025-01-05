<?php

namespace App\Data\Traceability;

use App\Models\ConsumerInfo;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ConsumerInfoData extends Data
{
    public function __construct(
        public ?int $id,

        public ?int $productRecipeId,

        #[Rule('required', 'integer')]
        public int $companyId,

        #[Rule('required', 'string')]
        public string $ingredients,

        #[Rule('nullable', 'string')]
        public ?string $consumingGuide,

        #[Rule('nullable', 'string')]
        public ?string $storingConditions,

        #[Rule('array')]
        public array $allergen = []
    ) {}

    public static function formModel(ConsumerInfo $info): self
    {
        return new self(
            id  : $info->id,
            companyId : $info->company_id,
            productRecipeId : $info->product_recipe_id,
            ingredients: $info->ingredients,
            consumingGuide: $info->consuming_guide,
            storingConditions: $info->storing_conditions,
        );
    }

    public static function messages(): array
    {
        return [
            'ingredients.required' => __('Validation/consumerInfo.ingredients.required'),
            'ingredients.string' => __('Validation/consumerInfo.ingredients.string'),
            'consuming_guide.string' => __('Validation/consumerInfo.consuming_guide.string'),
            'storing_conditions.string' => __('Validation/consumerInfo.storing_conditions.string'),
            'allergen.array' => __('Validation/consumerInfo.allergen.array'),
            'allergen.min' => __('Validation/consumerInfo.allergen.min'),
        ];
    }
}
