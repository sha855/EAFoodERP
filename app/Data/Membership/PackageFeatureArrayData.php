<?php

namespace App\Data\Membership;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class PackageFeatureArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        public string $featureHeading,

        /**
         * @var PackageFeatureData[]
         */
        public array $features,
    ) {}

    public static function messages(): array
    {
        return [
            'features' => __('please fill all fields'),
        ];
    }
}
