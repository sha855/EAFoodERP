<?php

namespace App\Data\FoodBuisness;

use App\Models\AdditionalBusinessActivity;
use App\Models\BusinessActivity;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class BusinessActivityData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'string', 'max:255'])]
        public string $name,
    ) {}

    public static function messages(): array
    {
        return [
            'name.required' => __('Validation/foodBuisnessType.name.required'),
            'name.string' => __('Validation/foodBuisnessType.name.string'),
            'name.max' => __('Validation/foodBuisnessType.name.max'),
        ];
    }

    /**
     * Create an instance of the DTO from a model.
     *
     * @param  BusinessActivity  $model
     */
    public static function fromModel(AdditionalBusinessActivity $model): static
    {
        return new static(
            id: $model->id,
            name: $model->name,
        );
    }
}
