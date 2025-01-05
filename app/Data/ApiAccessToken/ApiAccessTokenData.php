<?php

namespace App\Data\ApiAccessToken;

use App\Models\ApiAccessToken;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ApiAccessTokenData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('integer')]
        public ?int $userId,

        #[Rule('integer')]
        public ?int $companyId,

        #[Rule('required', 'string', 'max:255')]
        public string $name,

        #[Rule('string', 'max:255')]
        public ?string $apiAccessToken,

    ) {}

    public static function fromModel(ApiAccessToken $apiAccessToken): self
    {
        return new self(
            id: $apiAccessToken->id,
            userId: $apiAccessToken->user_id,
            companyId: $apiAccessToken->company_id,
            name: $apiAccessToken->name,
            apiAccessToken: $apiAccessToken->api_access_token,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('ApiAccessToken/Messages.id.integer'),
            'user_id.integer' => __('ApiAccessToken/Messages.user_id.integer'),
            'company_id.integer' => __('ApiAccessToken/Messages.company_id.integer'),

            'name.required' => __('ApiAccessToken/Messages.name.required'),
            'name.string' => __('ApiAccessToken/Messages.name.string'),
            'name.min' => __('ApiAccessToken/Messages.name.min'),
            'name.max' => __('ApiAccessToken/Messages.name.max'),

            'api_access_token.string' => __('ApiAccessToken/Messages.api_access_token.string'),
            'api_access_token.min' => __('ApiAccessToken/Messages.api_access_token.min'),
            'api_access_token.max' => __('ApiAccessToken/Messages.api_access_token.max'),
        ];
    }
}
