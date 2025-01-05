<?php

namespace App\Data\Users;

use App\Models\User;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class UpdateUser extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string')]
        public string $name,

        #[Rule('required', 'string', 'email')]
        public string $email,

        #[Rule('required', 'string', 'regex:/^\+\d+(-\d+)*$/')]
        public string $stdCode,

        #[Rule('required', 'string', 'regex:/^\d+(\s\d+)*$/')]
        public string $phoneNo,

        public ?string $emailVerifiedAt,
    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            stdCode: $user->std_code,
            phoneNo: $user->phone_no,
            emailVerifiedAt : $user->email_verified_at
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('User/User.id.integer'),

            'name.required' => __('User/User.name.required'),
            'name.string' => __('User/User.name.string'),

            'email.required' => __('User/User.email.required'),
            'email.string' => __('User/User.email.string'),
            'email.email' => __('User/User.email.email'),

            'std_code.required' => __('User/User.std_code.required'),
            'std_code.regex' => __('User/User.std_code.regex'),

            'phone_no.required' => __('User/User.phone_no.required'),
            'phone_no.regex' => __('User/User.phone_no.regex'),
        ];
    }
}
