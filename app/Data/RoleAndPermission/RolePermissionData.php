<?php

namespace App\Data\Roles;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class RolePermissionData extends Data
{
    public function __construct(
        #[Rule('required', 'string', 'max:255')]
        public string $role,

        #[Rule('array')]
        public array $permissions = []
    ) {}

    public static function messages(): array
    {
        return [
            'role.required' => __('Validation/rolePermission.role.required'),
            'role.string' => __('Validation/rolePermission.role.string'),
            'role.max' => __('Validation/rolePermission.role.max'),
            'permissions.array' => __('Validation/rolePermission.permissions.array'),
        ];
    }
}
