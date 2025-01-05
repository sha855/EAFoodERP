<?php

namespace App\Observers;

use App\Models\CompanyDetail;
use App\Models\ManageFolder;
use Spatie\Permission\Models\Role;

class ManageFolderObserver
{
    public function created(CompanyDetail $company): void
    {
        $userId = auth()->user()->id ?? $this->getAdmin()?->id;

        $folders = [
            ['menu' => 'Personnel hygiene', 'user_id' => $userId, 'company_id' => $company->id, 'parent_id' => 0],
            ['menu' => 'Waste management', 'user_id' => $userId, 'company_id' => $company->id, 'parent_id' => 0],
        ];

        $parentFolders = [];
        foreach ($folders as $folder) {
            $parentFolders[] = ManageFolder::create([
                'menu' => $folder['menu'],
                'user_id' => $folder['user_id'],
                'company_id' => $folder['company_id'],
                'parent_id' => $folder['parent_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $childFolders = [
            [
                'menu' => 'Facility and equipment',
                'user_id' => $userId,
                'company_id' => $company->id,
                'parent_id' => $parentFolders[0]->id,
            ],
            [
                'menu' => 'Certificates',
                'user_id' => $userId,
                'company_id' => $company->id,
                'parent_id' => $parentFolders[1]->id,
            ],
        ];

        foreach ($childFolders as $folder) {
            ManageFolder::create([
                'menu' => $folder['menu'],
                'user_id' => $folder['user_id'],
                'company_id' => $folder['company_id'],
                'parent_id' => $folder['parent_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Get the first admin user
     */
    public function getAdmin()
    {
        return Role::firstWhere('name', 'admin')?->users()->first();
    }
}
