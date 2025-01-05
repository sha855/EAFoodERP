<?php

namespace App\Data\HaccpPlan;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class CompanyProcessArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        /**
         * @var CompanyProcessData[]
        */

        public array $processes,


    ) {}

    public static function messages(): array
    {
        return [
            'processes' => __('Please fill required fields'),
        ];
    }
}
