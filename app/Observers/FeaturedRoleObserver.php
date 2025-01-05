<?php

namespace App\Observers;

use App\Models\CompanyDetail;
use App\Models\FeaturedRole;
use Spatie\Permission\Models\Role;

class FeaturedRoleObserver
{
    public function created(CompanyDetail $company): void
    {
        $roles = ['Management', 'Cooks', 'Cleaning', 'Maintenance', 'Delivery', 'Customer Service'];
        foreach ($roles as $role) {
            FeaturedRole::factory(1)->create(
                [
                    'user_id' => auth()->user()->id ?? $this->getAdmin()?->id,
                    'company_id' => $company->id,
                    'name' => $role,
                ]
            );
        }
    }

    public function getAdmin()
    {
        return Role::firstWhere('name', 'admin')?->users()->first();
    }
}
