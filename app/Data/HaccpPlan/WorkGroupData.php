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
class WorkGroupData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['string', 'max:255'])]
        public string $task,

        #[Rule(['required', 'integer'])]
        public int $companyId,

        #[Rule(['boolean'])]
        public bool $isRequired,

        #[Rule(['boolean'])]
        public bool $isServiceProvider,

        #[Rule(['string', 'max:255'])]
        public ?string $outsourcedService,

        #[Rule(['string', 'max:255'])]
        public string $responsible,

        #[Rule(['nullable', 'integer'])]
        public ?int $taskId,

        #[Rule(['required', 'integer'])]
        public int $userId,

        public bool $isNew = false

    ) {}

    public static function messages(): array
    {
        return [
            'task.required' => __('Validation/foodBuisnessType.name.required'),
            'task.string' => __('Validation/foodBuisnessType.name.string'),
            'task.max' => __('Validation/foodBuisnessType.name.max'),

            'companyId.required' => __('Validation/company.id.required'),
            'companyId.integer' => __('Validation/company.id.integer'),

            'isRequired.boolean' => __('Validation/is_required.boolean'),
            'isServiceProvider.boolean' => __('Validation/is_service_provider.boolean'),

            'outsourcedService.string' => __('Validation/outsourced_service.string'),
            'outsourcedService.max' => __('Validation/outsourced_service.max'),

            'responsible.string' => __('Validation/responsible.string'),
            'responsible.max' => __('Validation/responsible.max'),

            'task.string' => __('Validation/task.string'),
            'task.max' => __('Validation/task.max'),

            'taskId.required' => __('Validation/task_id.required'),
            'taskId.integer' => __('Validation/task_id.integer'),

            'userId.required' => __('Validation/user_id.required'),
            'userId.integer' => __('Validation/user_id.integer'),
        ];
    }

    public static function fromModel(WorkGroupTask $model): self
    {
        return new self(
            id: $model->id,
            task: $model->task,
            companyId: $model->company_id,
            isRequired: $model->is_required,
            isServiceProvider: $model->is_service_provider,
            outsourcedService: $model->outsourced_service,
            responsible: $model->responsible,
            taskId: $model->task_id,
            userId: $model->user_id,
        );
    }
}
