<?php

namespace App\Data\Traceability;

use App\Models\PreparationIngredient;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PreparedProductData extends Data
{
    public function __construct(

        public ?int $id,

        #[Rule('required', 'numeric')]
        public int $ingredientId,

        #[Rule('required', 'numeric')]
        public float $batch,

        #[Rule('required', 'string')]
        public string $expiryDate,

        #[Rule('required', 'numeric')]
        public float $amount,

        #[Rule('required', 'string')]
        public string $unit,

    ) {}

    public static function fromModel(PreparationIngredient $trace): self
    {
        return new self(
            id  : $trace->id,
            ingredientId : $trace->ingredient_id,
            batch: $trace->batch,
            expiryDate: $trace->expiryDate,
            amount: $trace->amount,
            unit: $trace->unit,
        );

    }

    public static function messages(): array
    {
        return [
            'ingredient_id.required' => __('Validation/PreparedProduct/productInfo.ingredient_id.required'),
            'ingredient_id.numeric' => __('Validation/PreparedProduct/productInfo.ingredient_id.numeric'),

            'batch.required' => __('Validation/PreparedProduct/productInfo.batch.required'),
            'batch.numeric' => __('Validation/PreparedProduct/productInfo.batch.numeric'),

            'expiry_date.required' => __('Validation/PreparedProduct/productInfo.expiry_date.required'),
            'expiry_date.string' => __('Validation/PreparedProduct/productInfo.expiry_date.string'),

            'amount.required' => __('Validation/PreparedProduct/productInfo.amount.required'),
            'amount.numeric' => __('Validation/PreparedProduct/productInfo.amount.numeric'),

            'unit.required' => __('Validation/PreparedProduct/productInfo.unit.required'),
            'unit.string' => __('Validation/PreparedProduct/productInfo.unit.string'),
        ];
    }
}
