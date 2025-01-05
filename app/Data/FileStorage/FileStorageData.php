<?php

namespace App\Data\FileStorage;

use App\Models\SubManageFile;
use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class FileStorageData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('nullable', 'integer')]
        public ?int $subMenuId,

        #[Rule('nullable', 'integer')]
        public ?int $companyId,

        #[Rule('nullable', 'string')]
        public ?string $name,

        #[Rule('nullable', 'file', 'mimes:jpg,jpeg,png,pdf,doc,docx,zip')]
        public ?UploadedFile $file,

    ) {}

    public static function fromModel(SubManageFile $file): self
    {
        return new self(
            id: $file->id,
            subMenuId: $file->sub_menu_id,
            companyId : $file->company_id,
            name: $file->name,
            file: $file->file,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => 'id must be an integer',
            'sub_menu_id.integer' => 'Sub menu ID must be an integer',
            'name.string' => 'Name must be a string',
            'file.file' => 'The file must be a valid file type',
            'file.mimes' => 'The file must be one of the following types: jpg, jpeg, png, pdf, doc, docx, zip',
        ];
    }
}
