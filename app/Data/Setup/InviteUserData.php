<?php

namespace App\Data\Setup;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class InviteUserData extends Data
{
    public function __construct(
        #[Rule('required', 'string', 'max:255')]
        public string $name,

        #[Rule('required', 'string', 'min:8')]
        public string $password,

        #[Rule('required', 'string', 'min:8', 'same:password')]
        public string $password_confirmation,

        #[Rule('nullable', 'string')]
        public ?string $token,

    ) {}

    public static function messages(): array

    {
        return [
            'name.required' => 'Name field required',
            'email.required' => 'Email field is required.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password_confirmation.same' => 'Passwords must match.',
            'companyName.required' => 'Company Name is required',
        ];
    }
}
