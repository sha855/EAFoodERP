<?php

namespace App\Data\HaccpPlan;

use App\Models\CompanyFoodProduct;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class ProducedFoodData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'integer'])]
        public int $foodProductId,

        #[Rule(['required', 'integer', 'max:500'])]
        public int $companyId,

        public bool $isActive = false,

    ) {}

    public static function messages(): array
    {
        return [
            'foodProductId.required' => __('Validation/ingredients.company_id.required'),
            'foodProductId.integer' => __('Validation/ingredients.company_id.integer'),
            'foodProductId.exists' => __('Validation/ingredients.company_id.exists'),
            'companyId.required' => __('Validation/ingredients.ingredients.required'),
            'companyId.integer' => __('Validation/ingredients.company_id.integer'),
        ];
    }

    public static function fromModel(CompanyFoodProduct $model): self
    {
        return new self(
            id: $model->id,
            foodProductId: $model->food_product_id,
            companyId: $model->company_id,
        );
    }
}
