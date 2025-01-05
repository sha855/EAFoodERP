<?php

namespace App\Repositories;

use App\Models\Audit;
use App\Models\CompanyDetail;

class AuditRepository
{
    public function geUserAudit(int $perPage, CompanyDetail $company)
    {
        return Audit::where('company_id', $company->id ?? selectedCompany()->id)->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getCurrentCompany()
    {
        return selectedCompany();
    }
}
