<?php

namespace App\Data\HaccpPlan;

use App\Models\FloorPlan;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class FloorPlanUploadData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('nullable', 'array')]
        public ?array $files,

        public ?string $filePath,

        #[Rule(['required', 'String'])]
        public string $floorPlan,

        #[Rule(['nullable'])]
        public ?int $companyId,

        public ?bool $isActive = true,

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

    public static function fromModel(FloorPlan $model): self
    {
        return new self(
            id: $model->id,
            files: $model->name,
            filePath: $model->file_path,
            floorPlan : $model->floor_plan,
            companyId : $model->company_id,
            isActive  : $model->is_active,
        );
    }
}
