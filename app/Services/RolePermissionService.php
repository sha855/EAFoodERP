<?php

namespace App\Services;

use App\Models\User;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role; // Ensure this is the correct path to your User model

class RolePermissionService
{
    public function getAllRoles()
    {
        return Role::all();
    }

    public function getAllPermissions()
    {
        return Permission::all();
    }

    public function createRoleWithPermissions(string $roleName, array $permissions)
    {
        $role = Role::create(['name' => $roleName]);
        $role->syncPermissions($permissions);

        return $role;
    }

    public function assignRoleToUser(int $userId, string $roleName)
    {
        $user = User::find($userId);
        $role = Role::findByName($roleName);
        $user->assignRole($role);

        return $user;
    }

    public function assignPermissionsToRole(string $roleName, array $permissions)
    {
        $role = Role::findByName($roleName);
        $role->syncPermissions($permissions);

        return $role;
    }
}
