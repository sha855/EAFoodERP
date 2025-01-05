<?php

namespace App\Data\Setup;

use App\Models\TeamsFeaturedRole;
use Spatie\LaravelData\Attributes\Computed;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public ?array $roles = [];

    #[Computed]
    public function roles(): array
    {
        return TeamsFeaturedRole::find($this->roles)?->toArray() ?? [];
    }

    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string')]
        public string $firstName,

        #[Rule('required', 'string')]
        public string $lastName,

        public ?int $companyId,

        #[Rule('required', 'string', 'email', 'unique:users,email')]
        public string $email,

        #[Rule('nullable', 'string')]
        public ?string $token,
    ) {
        $this->roles = $this->roles();
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Setup/User.validation.id.integer'),
            'firstName.required' =>  __('Setup/User.validation.firstName'),
            'lastName.required' => __('Setup/User.validation.lastName'),
            'email.required' => __('Setup/User.validation.email'),
            'token.string' => 'Shared access token must be a string',
        ];
    }
}
