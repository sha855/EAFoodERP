<?php

namespace App\Data\FileStorage;

use App\Models\SharedDocument;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ShareDocumentData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('nullable', 'integer')]
        public ?int $userId,

        #[Rule('nullable', 'integer')]
        public ?int $companyId,

        #[Rule('required', 'string')]
        public ?string $name,

        #[Rule('required', 'email')]
        public ?string $email,

        #[Rule('required', 'date')]
        public ?string $accessValidUntil,

        #[Rule('nullable', 'boolean')]
        public ?bool $haccpPlan,

        #[Rule('nullable', 'string')]
        public ?string $sharedAccessToken,
    ) {}

    public static function fromModel(SharedDocument $shareDocument): self
    {
        return new self(
            id: $shareDocument->id,
            userId: $shareDocument->user_id,
            companyId: $shareDocument->company_id,
            name: $shareDocument->name,
            email: $shareDocument->email,
            accessValidUntil: $shareDocument->access_valid_until,
            haccpPlan: $shareDocument->haccp_plan,
            sharedAccessToken: $shareDocument->shared_access_token,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => 'Id must be an integer',
            'user_id.integer' => 'User id must be an integer',
            'company_id.integer' => 'Company id must be an integer',
            'name.required' => 'Name is required',
            'name.string' => 'Name must be a string',
            'email.required' => 'Email is required',
            'email.email' => 'Email must be a valid email',
            'access_valid_until.required' => 'Access valid until is required',
            'access_valid_until.date' => 'Access valid until must be a date',
            'haccp_plan.boolean' => 'Haccp plan must be boolean (true/false)',
            'shared_access_token.string' => 'Shared access token must be a string',
        ];
    }
}
