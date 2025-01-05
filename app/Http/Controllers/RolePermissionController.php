<?php

namespace App\Http\Controllers;

use App\Data\Roles\AssignPermissionData;
use App\Data\Roles\AssignRoleData;
use App\Data\Roles\RolePermissionData;
use App\Services\RolePermissionService;

class RolePermissionController extends Controller
{
    public function __construct(protected RolePermissionService $rolePermissionService) {}

    public function index()
    {
        $roles = $this->rolePermissionService->getAllRoles();
        $permissions = $this->rolePermissionService->getAllPermissions();

        return view('roles.index', compact('roles', 'permissions'));
    }

    public function store(RolePermissionData $data)
    {
        $this->rolePermissionService->createRoleWithPermissions($data->role, $data->permissions);

        return redirect()->back()->with('success', 'Role created successfully!');
    }

    public function assignRole(AssignRoleData $data)
    {
        $user = $this->rolePermissionService->assignRoleToUser($data->user_id, $data->role);

        return redirect()->back()->with('success', 'Role assigned successfully to '.$user->name.'!');
    }

    public function assignPermission(AssignPermissionData $data)
    {
        $role = $this->rolePermissionService->assignPermissionsToRole($data->role, $data->permissions);

        return redirect()->back()->with('success', 'Permissions assigned successfully to role '.$role->name.'!');
    }
}
