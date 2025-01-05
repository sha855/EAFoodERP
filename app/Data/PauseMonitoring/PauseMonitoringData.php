<?php

namespace App\Data\PauseMonitoring;

use App\Models\PauseMonitoring;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PauseMonitoringData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'integer')]
        public ?int $monitoringTaskId,

        #[Rule('integer')]
        public ?int $userId,

        #[Rule('integer')]
        public ?int $companyId,

        #[Rule('required', 'string')]
        public string $startDate,

        #[Rule('required', 'string', 'after:start_date')]
        public string $endDate,

    ) {}

    public static function fromModel(PauseMonitoring $pauseMonitoring): self
    {
        return new self(
            id: $pauseMonitoring->id,
            monitoringTaskId: $pauseMonitoring->monitoring_task_id,
            userId: $pauseMonitoring->user_id,
            companyId: $pauseMonitoring->company_id,
            startDate: $pauseMonitoring->start_date,
            endDate: $pauseMonitoring->end_date,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('PauseMonitoring/Messages.validate.id.integer'),
            'monitoring_task_id.required' => __('PauseMonitoring/Messages.validate.monitoring_task_id.required'),
            'start_date.required' => __('PauseMonitoring/Messages.validate.start_date.required'),
            'end_date.required' => __('PauseMonitoring/Messages.validate.end_date.required'),
            'end_date.after' => __('PauseMonitoring/Messages.validate.end_date.after'),
        ];
    }
}
