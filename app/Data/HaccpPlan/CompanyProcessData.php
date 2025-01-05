<?php

namespace App\Data\HaccpPlan;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class CompanyProcessData extends Data
{
    public function __construct(

        public ?int $id,

        public ?string $description,

        #[Rule(['required', 'string'])]
        public string $name,

        #[Rule(['required', 'integer'])]
        public int $companyId,

        #[Rule(['required', 'boolean'])]
        public bool $isActive,

        #[Rule(['nullable', 'array'])]
        public ?array $activities,

    ) {}

    public static function messages(): array
    {
        return [
            'name.required' => __('Validation/ProcessActivityData/process_id.required'),
            'name.integer' => __('Validation/ProcessActivityData/process_id.integer'),
            'isActive.required' => __('Validation/ProcessActivityData/is_active.required'),
            'isActive.boolean' => __('Validation/ProcessActivityData/is_active.boolean'),
        ];
    }

}
