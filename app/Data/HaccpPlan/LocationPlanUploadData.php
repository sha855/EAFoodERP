<?php

namespace App\Data\HaccpPlan;

use App\Models\LocationPlan;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class LocationPlanUploadData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('required', 'array')]
        public array $files,

        public ?string $filePath,

        #[Rule(['nullable'])]
        public ?int $companyId,

    ) {}

    public static function messages(): array
    {
        return [
            'files.required' => __('Validation/auditUpload.files.required'),
            'files.array' => __('Validation/auditUpload.files.array'),
            'files.*.file' => __('Validation/auditUpload.files.*.file'),
            'files.*.mimes' => __('Validation/auditUpload.files.*.mimes'),
            'files.*.max' => __('Validation/auditUpload.files.*.max'),
        ];
    }

    public static function fromModel(LocationPlan $model): self
    {
        return new self(
            id: $model->id,
            files: $model->name,
            filePath: $model->file_path,
            companyId : $model->company_id,
        );
    }
}
