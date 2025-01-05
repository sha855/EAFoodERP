<?php

namespace App\Data\Monitor;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class MonitoringTask extends Data
{
    public function __construct(
        #[Rule('required', 'integer', 'exists:monitoring_tasks,id')]
        public int $task_id,

        #[Rule('required', 'boolean')]
        public bool $is_enabled
    ) {}

    public static function messages(): array
    {
        return [
            'task_id.required' => __('Validation/monitoring.task_id.required'),
            'task_id.integer' => __('Validation/monitoring.task_id.integer'),
            'task_id.exists' => __('Validation/monitoring.task_id.exists'),
            'is_enabled.required' => __('Validation/monitoring.is_enabled.required'),
            'is_enabled.boolean' => __('Validation/monitoring.is_enabled.boolean'),
        ];
    }
}
