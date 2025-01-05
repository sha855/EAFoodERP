<?php

namespace App\Data\Roles;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class AssignRoleData extends Data
{
    public function __construct(
        #[Rule('required', 'integer', 'exists:users,id')]
        public int $user_id,

        #[Rule('required', 'string', 'exists:roles,name')]
        public string $role
    ) {}

    public static function messages(): array
    {
        return [
            'user_id.required' => __('Validation/assignRole.user_id.required'),
            'user_id.integer' => __('Validation/assignRole.user_id.integer'),
            'user_id.exists' => __('Validation/assignRole.user_id.exists'),
            'role.required' => __('Validation/assignRole.role.required'),
            'role.string' => __('Validation/assignRole.role.string'),
            'role.exists' => __('Validation/assignRole.role.exists'),
        ];
    }
}
