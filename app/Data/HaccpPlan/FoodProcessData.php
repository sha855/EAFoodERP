<?php

namespace App\Data\HaccpPlan;

use App\Models\FoodHazard;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FoodProcessData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule(['required', 'string', 'max:255'])]
        public string $processName,

        #[Rule(['required', 'boolean'])]
        public bool $isActiveProcess,

        #[Rule(['required', 'integer'])]
        public int $companyId,

        #[Rule(['required', 'string'])]
        public string $additionalInfo,

        #[Rule(['boolean'])]
        public bool $isActiveAddInfo,

        #[Rule(['nullable', 'string'])]
        public ?string $hazardInfo,

        #[Rule(['boolean'])]
        public bool $isActiveHazardInfo,

        #[Rule(['nullable', 'integer'])]
        public ?int $customProcessId = null,

        #[Rule(['nullable', 'string'])]
        public ?string $potentialHazards = null,

        #[Rule(['nullable', 'string'])]
        public ?string $hazardsType = null,

        #[Rule(['nullable', 'integer'])]
        public ?int $likelihood = null,

        #[Rule(['nullable', 'integer'])]
        public ?int $severity = null,

        #[Rule(['nullable', 'string'])]
        public ?string $riskLevel = null,

        #[Rule(['nullable', 'string'])]
        public ?string $justificationDecision = null,

        #[Rule(['nullable', 'string'])]
        public ?string $preventiveMeasure = null,

        #[Rule(['nullable', 'string'])]
        public ?string $criticalLimit = null,

        #[Rule(['nullable', 'string'])]
        public ?string $correctiveAction = null,

        #[Rule(['nullable', 'string'])]
        public ?string $verification = null,

        #[Rule(['nullable', 'array'])]
        public ?array $monitoringTaskId = [],

        #[Rule(['nullable', 'array'])]
        public ?array $auditTemplateId = []
    ) {}

    public static function messages(): array
    {
        return [
            'processName.required' => __('Validation/FoodProcessData/process_name.required'),
            'processName.string' => __('Validation/FoodProcessData/process_name.string'),
            'processName.max' => __('Validation/FoodProcessData/process_name.max'),

            'companyId.required' => __('Validation/FoodProcessData/company_id.required'),
            'companyId.integer' => __('Validation/FoodProcessData/company_id.integer'),

            'likelihood.integer' => __('Validation/FoodProcessData/likelihood.integer'),
            'severity.integer' => __('Validation/FoodProcessData/severity.integer'),

            'riskLevel.string' => __('Validation/FoodProcessData/risk_level.string'),
            'justificationDecision.string' => __('Validation/FoodProcessData/justification_decision.string'),
            'preventiveMeasure.string' => __('Validation/FoodProcessData/preventive_measure.string'),
            'criticalLimit.string' => __('Validation/FoodProcessData/critical_limit.string'),
            'correctiveAction.string' => __('Validation/FoodProcessData/corrective_action.string'),
            'verification.string' => __('Validation/FoodProcessData/verification.string'),

            'monitoringTaskId.array' => __('Validation/FoodProcessData/monitoring_task_id.array'),
            'auditTemplateId.array' => __('Validation/FoodProcessData/audit_template_id.array'),
        ];
    }

    public static function fromModel(FoodHazard $model): self
    {
        return new self(
            id: $model->id,
            processName: $model->process_name,
            isActiveProcess: $model->is_active_process,
            companyId: $model->company_id,
            additionalInfo: $model->additional_info,
            isActiveAddInfo: $model->is_active_add_info,
            hazardInfo: $model->hazard_info,
            isActiveHazardInfo: $model->is_active_hazard_info,
            customProcessId: $model->custom_process_id,
            potentialHazards: $model->potential_hazards,
            hazardsType: $model->hazards_type,
            likelihood: $model->likelihood,
            severity: $model->severity,
            riskLevel: $model->risk_level,
            justificationDecision: $model->justification_decision,
            preventiveMeasure: $model->preventive_measure,
            criticalLimit: $model->critical_limit,
            correctiveAction: $model->corrective_action,
            verification: $model->verification,
            monitoringTaskId: $model->monitoring_task_id ?? [],
            auditTemplateId: $model->audit_template_id ?? []
        );
    }
}
