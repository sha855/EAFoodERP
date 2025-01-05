<?php

namespace App\Data\HaccpPlan;

use App\Models\WorkGroupTask;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class WorkGroupResponsibleData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['array'])]
        public array $users,

    ) {}

    public static function messages(): array
    {
        return [
            'users.required' => __('Validation/foodBuisnessType.name.required'),
            'users.string' => __('Validation/foodBuisnessType.name.string'),
            'users.max' => __('Validation/foodBuisnessType.name.max'),
        ];
    }

    public static function fromModel(WorkGroupTask $model): self
    {
        return new self(
            id: $model->id,
            users: $model->users,
        );
    }
}
