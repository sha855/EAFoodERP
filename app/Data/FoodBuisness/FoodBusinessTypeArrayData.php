<?php

namespace App\Data\FoodBuisness;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FoodBusinessTypeArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        /**
         * @var FoodBusinessTypeData[]
         */
        public array $foodBusinessTypes,
    ) {}

    /**
     * Get the custom validation messages.
     */
    public static function messages(): array
    {
        return [
            'foodBusinessTypes' => __('Please fill required fields'),
        ];
    }
}
