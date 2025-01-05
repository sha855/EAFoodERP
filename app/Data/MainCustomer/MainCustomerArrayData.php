<?php

namespace App\Data\MainCustomer;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class MainCustomerArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        /**
         * @var MainCustomerData[]
         */
        public array $mainCustomer,
    ) {}

    public static function messages(): array
    {
        return [
            'mainCustomer' => __('feature heading required'),
        ];
    }
}
