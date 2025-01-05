<?php

namespace App\Data\FoodBuisness;

use App\Models\FoodBusinessType;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FoodBusinessTypeData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'string', 'max:255'])]
        public string $name,

        #[Rule(['required', 'string', 'max:500'])]
        public string $description,
    ) {}

    /**
     * Get the custom validation messages.
     */
    public static function messages(): array
    {
        return [
            'name.required' => __('Validation/foodBuisnessType.name.required'),
            'name.string' => __('Validation/foodBuisnessType.name.string'),
            'name.max' => __('Validation/foodBuisnessType.name.max'),

            'description.required' => __('Validation/foodBuisnessType.description.required'),
            'description.string' => __('Validation/foodBuisnessType.description.string'),
            'description.max' => __('Validation/foodBuisnessType.description.max'),
        ];
    }

    /**
     * Create an instance of the DTO from a model.
     */
    public static function fromModel(FoodBusinessType $model): static
    {
        return new static(
            id: $model->id,
            name: $model->name,
            description: $model->description,
        );
    }
}
