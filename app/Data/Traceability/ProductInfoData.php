<?php

namespace App\Data\Traceability;

use App\Models\TraceProductInfo;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ProductInfoData extends Data
{
    public function __construct(

        public ?int $id,

        public ?int $productRecipeId,

        #[Rule('required', 'numeric')]
        public int $companyId,

        #[Rule('required', 'numeric')]
        public float $recipeTotalAmount,

        #[Rule('required', 'string')]
        public string $recipeTotalAmountUnit,

        #[Rule('required', 'numeric')]
        public float $onePortionAmount,

        #[Rule('required', 'string')]
        public string $onePortionAmountUnit,

        #[Rule('required', 'string')]
        public string $preparationInstructionst,

        #[Rule('required', 'array')]
        public array $ingredients,


    ) {}

    public function getIngredientsData(): array
    {
        return array_map(fn ($ingredient) => [
            'ingredient' => $ingredient['ingredient'],
            'amount' => $ingredient['amount'],
            'unit' => $ingredient['unit'],
        ], $this->ingredients);
    }

    public static function fromModel(TraceProductInfo $trace): self
    {
        $ingredients = $trace->ingredients ?? [];
        $ingredients = array_map(fn ($ingredient) => [
            'ingredient' => $ingredient['ingredient'],
            'amount' => $ingredient['amount'],
            'unit' => $ingredient['unit'],
        ], $ingredients);

        return new self(
            id  : $trace->id,
            productRecipeId : $trace->product_recipes_id,
            recipeTotalAmount: $trace->recipe_total_amount,
            recipeTotalAmountUnit: $trace->recipe_total_amount_unit,
            onePortionAmount: $trace->one_portion_amount,
            onePortionAmountUnit: $trace->one_portion_amount_unit,
            preparationInstructionst: $trace->preparation_instructionst,
            ingredients: $trace->ingredients ?? [],
            companyId : $trace->company_id ?? 0
        );
    }

    public static function messages(): array
    {
        return [
            'recipe_total_amount.required' => __('Validation/productInfo.recipe_total_amount.required'),
            'recipe_total_amount.numeric' => __('Validation/productInfo.recipe_total_amount.numeric'),
            'recipe_total_amount_unit.required' => __('Validation/productInfo.recipe_total_amount_unit.required'),
            'recipe_total_amount_unit.string' => __('Validation/productInfo.recipe_total_amount_unit.string'),
            'one_portion_amount.required' => __('Validation/productInfo.one_portion_amount.required'),
            'one_portion_amount.numeric' => __('Validation/productInfo.one_portion_amount.numeric'),
            'one_portion_amount_unit.required' => __('Validation/productInfo.one_portion_amount_unit.required'),
            'one_portion_amount_unit.string' => __('Validation/productInfo.one_portion_amount_unit.string'),
            'preparation_instructionst.required' => __('Validation/productInfo.preparation_instructionst.required'),
            'preparation_instructionst.string' => __('Validation/productInfo.preparation_instructionst.string'),
            'ingredients.required' => __('Validation/productInfo.ingredients.required'),
            'ingredients.array' => __('Validation/productInfo.ingredients.array'),
            'ingredients.*.ingredient.required' => __('Validation/productInfo.ingredients.ingredient.required'),
            'ingredients.*.ingredient.string' => __('Validation/productInfo.ingredients.ingredient.string'),
            'ingredients.*.amount.required' => __('Validation/productInfo.ingredients.amount.required'),
            'ingredients.*.amount.numeric' => __('Validation/productInfo.ingredients.amount.numeric'),
            'ingredients.*.unit.required' => __('Validation/productInfo.ingredients.unit.required'),
            'ingredients.*.unit.string' => __('Validation/productInfo.ingredients.unit.string'),
        ];
    }
}
