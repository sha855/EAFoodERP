<?php

namespace App\Data\Traceability;

use App\Models\ProductRecipe;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ProductRecipeData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('required', 'integer')]
        public int $companyId,

        #[Rule('required', 'string', 'max:255')]
        public string $productName,

        #[Rule('required', 'string', 'max:255')]
        public string $upcCode,

        #[Rule('required', 'string', 'max:255')]
        public string $productCode,

        #[Rule('required', 'integer')]
        public ?int $expiration,

        #[Rule('required', 'string')]
        public string $expirationTime,

        #[Rule('boolean')]
        public ?bool $isUsedAsIngredient,

        #[Rule('required', 'string', 'in:our_recipe,purchased')]
        public string $productType,

        #[Rule('required', 'string', 'in:best_before,used_by')]
        public string $expirationType,

        #[Rule('nullable')]
        public ?array $files,
    ) {}

    public static function fromModel(ProductRecipe $recipe): self
    {
        return new self(
            id: $recipe->id,
            companyId : $recipe->company_id,
            productName: $recipe->product_name,
            upcCode: $recipe->upc_code,
            productCode: $recipe->product_code,
            expiration: $recipe->expiration_date,
            expirationTime : $recipe->expirationTime,
            isUsedAsIngredient: $recipe->is_used_as_ingredient,
            productType: $recipe->product_type,
            expirationType: $recipe->expiration_type,
            files: $recipe->files ?? []
        );
    }

    public static function messages(): array
    {
        return [
            'product_name.required' => __('Validation/productRecipe.product_name.required'),
            'product_name.string' => __('Validation/productRecipe.product_name.string'),
            'product_name.max' => __('Validation/productRecipe.product_name.max'),

            'upc_code.string' => __('Validation/productRecipe.upc_code.string'),
            'upc_code.max' => __('Validation/productRecipe.upc_code.max'),

            'product_code.string' => __('Validation/productRecipe.product_code.string'),
            'product_code.max' => __('Validation/productRecipe.product_code.max'),

            'expiration_date.date' => __('Validation/productRecipe.expiration_date.date'),

            'is_used_as_ingredient.boolean' => __('Validation/productRecipe.is_used_as_ingredient.boolean'),

            'product_type.required' => __('Validation/productRecipe.product_type.required'),
            'product_type.string' => __('Validation/productRecipe.product_type.string'),
            'product_type.in' => __('Validation/productRecipe.product_type.in'),

            'expiration_type.required' => __('Validation/productRecipe.expiration_type.required'),
            'expiration_type.string' => __('Validation/productRecipe.expiration_type.string'),
            'expiration_type.in' => __('Validation/productRecipe.expiration_type.in'),

            'best_before.boolean' => __('Validation/productRecipe.best_before.boolean'),
            'use_by.boolean' => __('Validation/productRecipe.use_by.boolean'),
        ];
    }
}
