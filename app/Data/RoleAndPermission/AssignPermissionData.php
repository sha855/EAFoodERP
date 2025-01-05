<?php

namespace App\Data\Roles;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class AssignPermissionData extends Data
{
    public function __construct(
        #[Rule('required', 'string', 'exists:roles,name')]
        public string $role,

        #[Rule('array')]
        public array $permissions = []
    ) {}

    public static function messages(): array
    {
        return [
            'role.required' => __('Validation/assignPermission.role.required'),
            'role.string' => __('Validation/assignPermission.role.string'),
            'role.exists' => __('Validation/assignPermission.role.exists'),
            'permissions.array' => __('Validation/assignPermission.permissions.array'),
        ];
    }
}
