<?php

namespace App\Data\Audit;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class AuditTemplateDetailData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $text,

        #[Rule('required', 'string', 'max:255')]
        public string $language,

        #[Rule('required', 'string', 'max:255')]
        public string $selectedScore,

        #[Rule('required', 'string', 'max:255')]
        public string $comment,
    ) {}

    public static function messages(): array
    {
        return [
            'text.required' => __('Validation/AuditDetail.audit_template_detail.text_required'),
            'text.string' => __('Validation/AuditDetail.audit_template_detail.text_string'),
            'text.max' => __('Validation/AuditDetail.audit_template_detail.text_max'),

            'language.required' => __('Validation/AuditDetail.audit_template_detail.language_required'),
            'language.string' => __('Validation/AuditDetail.audit_template_detail.language_string'),
            'language.max' => __('Validation/AuditDetail.audit_template_detail.language_max'),

            'selectedScore.required' => __('Validation/AuditDetail.audit_template_detail.selected_score_required'),
            'selectedScore.string' => __('Validation/AuditDetail.audit_template_detail.selected_score_string'),
            'selectedScore.max' => __('Validation/AuditDetail.audit_template_detail.selected_score_max'),

            'comment.required' => __('Validation/AuditDetail.audit_template_detail.comment_required'),
            'comment.string' => __('Validation/AuditDetail.audit_template_detail.comment_string'),
            'comment.max' => __('Validation/AuditDetail.audit_template_detail.comment_max'),
        ];
    }
}
