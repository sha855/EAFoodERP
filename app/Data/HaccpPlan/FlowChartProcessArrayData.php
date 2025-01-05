<?php

namespace App\Data\HaccpPlan;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FlowChartProcessArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        /**
         * @var FlowChartProcessData[]
         */
        public array $processSteps,

        public ?int $companyId,

        #[Rule('nullable')]
        public ?UploadedFile $image = null,

    ) {}

    public static function messages(): array
    {
        return [
            'processSteps' => __('Please fill required fields'),
        ];
    }
}
