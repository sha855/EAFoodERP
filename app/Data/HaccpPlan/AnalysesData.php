<?php

namespace App\Data\HaccpPlan;

use App\Models\AnalysesTask;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class AnalysesData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'string', 'max:255'])]
        public string $taskName,

        #[Rule(['required', 'string'])]
        public string $frequency,

        #[Rule(['required', 'integer'])]
        public int $companyId,

        #[Rule(['nullable', 'integer'])]
        public ?int $analysesTaskId = null,

        #[Rule(['nullable', 'string', 'max:500'])]
        public ?string $comment,

        #[Rule(['nullable', 'string', 'max:255'])]
        public ?string $customFrequency = null,

        public bool $isNew = false
    ) {}

    public static function messages(): array
    {
        return [
            'taskName.required' => __('Validation/Analyses.Analyses.name.required'),

            'taskName.string' => __('Validation/Analyses.Analyses.name.string'),
            'taskName.max' => __('Validation/Analyses.Analyses.name.max'),


            'frequency.required' => __('Validation/Analyses.Analyses.frequency.required'),
            'frequency.string' => __('Validation/Analyses.Analyses.frequency.string'),

            'companyId.required' => __('Validation/Analyses.Analyses.id.required'),
            'companyId.integer' => __('Validation/Analyses.Analyses.id.integer'),

            'analysesTaskId.integer' => __('Validation/Analyses.Analyses.id.integer'),

            'comment.string' => __('Validation/Analyses.Analyses.comment.string'),
            'comment.max' => __('Validation/Analyses.Analyses.comment.max'),

            'customFrequency.string' => __('Validation/Analyses.Analyses.custom_frequency.string'),
            'customFrequency.max' => __('Validation/Analyses.Analyses.custom_frequency.max'),
        ];
    }

    public static function fromModel(AnalysesTask $model): self
    {
        return new self(
            id: $model->id,
            taskName: $model->task_name,
            frequency: $model->taskDetail?->frequency,
            companyId: $model->taskDetail?->company_id,
            analysesTaskId: $model->taskDetail?->analyses_task_id,
            comment: $model->taskDetail?->comment,
            customFrequency: $model->taskDetail?->custom_frequency,
            isNew: false
        );
    }
}
