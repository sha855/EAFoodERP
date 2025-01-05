<?php

namespace App\Data\Users;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class UserRegistrationData extends Data
{
    public function __construct(
        #[Rule('required', 'string', 'max:255')]
        public string $name,

        #[Rule('required', 'email', 'max:255', 'unique:users,email')]
        public string $email,

        #[Rule('required', 'string', 'min:8')]
        public string $password,

        #[Rule('required', 'string', 'min:8', 'same:password')]
        public string $password_confirmation
    ) {}

    public static function messages(): array
    {
        return [
            'name.required' => __('Validation/userRegistion.name.required'),
            'email.required' => __('Validation/userRegistion.email.required'),
            'email.email' => __('Validation/userRegistion.email.email'),
            'email.unique' => __('Validation/userRegistion.email.unique'),
            'password.required' => __('Validation/userRegistion.password.required'),
            'password.min' => __('Validation/userRegistion.password.min'),
            'password_confirmation.same' => __('Validation/userRegistion.password_confirmation.same'), // Corrected: Match confirmation message key
        ];
    }
}
