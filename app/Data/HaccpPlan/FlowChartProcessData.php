<?php

namespace App\Data\HaccpPlan;

use App\Models\FlowChartProcessStep;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FlowChartProcessData extends Data
{
    public function __construct(
        #[Rule(['nullable', 'integer'])]
        public ?int $id,

        #[Rule(['nullable', 'integer'])]
        public ?int $flowChartId,

        #[Rule(['required', 'integer'])]
        public ?int $companyId,

        #[Rule(['required', 'string', 'max:255'])]
        public string $processName,

        #[Rule(['required', 'string', 'max:255'])]
        public string $processStep,

        #[Rule(['required', 'string', 'max:255'])]
        public string $type,

        #[Rule(['boolean'])]
        public bool $isTime,

        #[Rule(['boolean'])]
        public bool $isTemperature,

        #[Rule(['boolean'])]
        public bool $isQuality,

        #[Rule(['boolean'])]
        public bool $isRecording,

        #[Rule(['nullable', 'string'])]
        public ?string $instruction
    ) {}

    public static function messages(): array
    {
        return [
            'flowChartId.required' => __('Validation/FlowChartProcessData/flow_chart_id.required'),
            'flowChartId.integer' => __('Validation/FlowChartProcessData/flow_chart_id.integer'),
            'processStep.required' => __('Validation/FlowChartProcessData/process_step.required'),
            'processStep.string' => __('Validation/FlowChartProcessData/process_step.string'),
            'type.required' => __('Validation/FlowChartProcessData/type.required'),
            'type.string' => __('Validation/FlowChartProcessData/type.string'),
            'isTime.boolean' => __('Validation/FlowChartProcessData/is_time.boolean'),
            'isTemperature.boolean' => __('Validation/FlowChartProcessData/is_temperature.boolean'),
            'isQuality.boolean' => __('Validation/FlowChartProcessData/is_quality.boolean'),
            'isRecording.boolean' => __('Validation/FlowChartProcessData/is_recording.boolean'),
            'instruction.string' => __('Validation/FlowChartProcessData/instruction.string'),
        ];
    }

    public static function fromModel(FlowChartProcessStep $model): self
    {
        return new self(
            id          : $model->id,
            flowChartId : $model->flow_chart->id,
            processName : $model->flow_chart->name,
            processStep : $model->process_step,
            type        : $model->type,
            isTime      : $model->is_time,
            isTemperature: $model->is_temperature,
            isQuality   : $model->is_quality,
            isRecording : $model->is_recording,
            instruction : $model->instruction,
            companyId   : $model->flow_chart->company_id,
        );
    }
}
