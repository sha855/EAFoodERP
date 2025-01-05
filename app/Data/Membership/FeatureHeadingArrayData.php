<?php

namespace App\Data\Membership;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FeatureHeadingArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        /**
         * @var FeatureHeadingData[]
         */
        public array $featureHeading,

    ) {}

    public static function messages(): array
    {
        return [
            'featureHeading' => __('feature heading required'),
        ];
    }
}
