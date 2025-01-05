<?php

namespace App\Data\Audit;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class AuditTemplateDetailArrayData extends Data
{
    public function __construct(
        #[Rule(['required'])]
        public ?int $id,

        public string $name,

        public string $auditee,

        public string $auditor,

        public string $scoreLevel,

        public string $auditFrequency,

        public string $startDate,

        /**
         * @var AuditTemplateDetailData[]
         */
        public array $questions,
    ) {}

    public static function messages(): array
    {
        return [
            'questions' => __('Please fill required fields'),
        ];
    }
}
