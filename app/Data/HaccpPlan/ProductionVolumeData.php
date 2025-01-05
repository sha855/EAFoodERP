<?php

namespace App\Data\HaccpPlan;

use App\Models\ProductionVolume;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class ProductionVolumeData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'integer'])]
        public int $foodProductId,

        #[Rule(['required', 'integer'])]
        public int $companyId,

        #[Rule(['required', 'string', 'max:500'])]
        public string $volume,

        #[Rule(['required', 'string', 'max:500'])]
        public string $unit,

        #[Rule(['required', 'string', 'max:500'])]
        public string $period,

    ) {}

    public static function messages(): array
    {
        return [
            'foodProductId.required' => __('Validation/productionVolume.company_id.required'),
            'foodProductId.integer' => __('Validation/productionVolume.company_id.integer'),
            'foodProductId.exists' => __('Validation/productionVolume.company_id.exists'),
            'companyId.required' => __('Validation/productionVolume.ingredients.required'),
            'companyId.integer' => __('Validation/productionVolume.company_id.integer'),
            'volume.required' => __('Validation/productionVolume.ingredients.required'),
            'volume.string' => __('Validation/productionVolume.company_id.integer'),
            'unit.required' => __('Validation/productionVolume.ingredients.required'),
            'unit.string' => __('Validation/productionVolume.company_id.integer'),
            'period.required' => __('Validation/productionVolume.ingredients.required'),
            'period.string' => __('Validation/productionVolume.company_id.integer'),
        ];
    }

    public static function fromModel(ProductionVolume $model): self
    {
        return new self(
            id: $model->id,
            foodProductId: $model->food_product_id,
            companyId: $model->company_id,
            volume : $model->volume,
            unit : $model->unit,
            period : $model->period
        );
    }
}
