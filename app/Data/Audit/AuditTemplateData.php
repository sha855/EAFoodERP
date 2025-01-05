<?php

namespace App\Data\Audit;

use App\Models\AuditTemplate;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class AuditTemplateData extends Data
{
    public function __construct(
        #[Rule('nullable')]
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $name,

        #[Rule('nullable')]
        public ?string $auditor,

        #[Rule('nullable')]
        public ?string $auditee,

        #[Rule('required', 'string', 'max:255')]
        public string $scoreLevel,

        #[Rule('required', 'string', 'max:255')]
        public string $auditFrequency,

        #[Rule('required', 'date', 'date_format:Y-m-d')]
        public string $startDate,

        #[Rule('required', 'array', 'min:1')]
        public array $question,

        public ?int $companyId
    ) {
        $this->validateQuestionText();
    }

    private function validateQuestionText()
    {
        $validator = Validator::make(
            ['question' => $this->question],
            [
                'question' => ['required', 'array', 'min:1'],
                'question.*.text' => ['required', 'string'],
            ]
        );

        if ($validator->fails()) {
            throw new ValidationException($validator);
        }
    }

    public static function fromModel(AuditTemplate $model): self
    {

        return new self(
            id : $model->id,
            name : $model->file_path,
            auditor : $model->company_id,
            auditee : $model->auditee,
            scoreLevel : $model->score_level,
            auditFrequency : $model->audit_frequency,
            startDate : $model->start_date,
            question : $model->question,
            companyId : $model->company_id,
        );

    }

    public static function messages(): array
    {
        return [
            'name.required' => __('Validation/auditTemplate.name.required'),
            'name.string' => __('Validation/auditTemplate.name.string'),
            'name.max' => __('Validation/auditTemplate.name.max'),

            'scoreLevel.required' => __('Validation/auditTemplate.scoreLevel.required'),
            'scoreLevel.string' => __('Validation/auditTemplate.scoreLevel.string'),
            'scoreLevel.max' => __('Validation/auditTemplate.scoreLevel.max'),

            'startDate.required' => __('Validation/auditTemplate.startDate.required'),
            'startDate.date' => __('Validation/auditTemplate.startDate.date'),
            'startDate.date_format' => __('Validation/auditTemplate.startDate.date_format'),

            'question.required' => __('Validation/auditTemplate.question.required'),
            'question.array' => __('Validation/auditTemplate.question.array'),
            'question.min' => __('Validation/auditTemplate.question.min'),

            'question.*.text.required' => __('Validation/auditTemplate.question.*.text.required'),
            'question.*.text.string' => __('Validation/auditTemplate.question.*.text.string'),
        ];
    }
}
