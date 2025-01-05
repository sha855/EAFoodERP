<?php

namespace App\Data\HaccpPlan;

use App\Models\CompanyIngredients;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class IngredientsData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'integer'])]
        public int $companyId,

        #[Rule(['required', 'array', 'max:500'])]
        public array $ingredients,
    ) {}

    public static function messages(): array
    {
        return [
            'company_id.required' => __('Validation/ingredients.company_id.required'),
            'company_id.integer' => __('Validation/ingredients.company_id.integer'),
            'company_id.exists' => __('Validation/ingredients.company_id.exists'),

            'ingredients.required' => __('Validation/ingredients.ingredients.required'),
            'ingredients.array' => __('Validation/ingredients.ingredients.array'),
            'ingredients.min' => __('Validation/ingredients.ingredients.min'),
            'ingredients.*.array' => __('Validation/ingredients.ingredients.ingredient_structure'),
        ];
    }

    public static function fromModel(CompanyIngredients $model): self
    {
        return new self(
            id: $model->id,
            companyId: $model->name,
            ingredients: $model->work_group_task,
        );
    }
}
