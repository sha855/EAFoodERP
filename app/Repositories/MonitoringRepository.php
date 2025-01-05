<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\MonitoringTask;
use Illuminate\Pagination\LengthAwarePaginator;

class MonitoringRepository
{
    public function getMonitoringTask(?CompanyDetail $companyDetail = null, int $perPage = 10, $search = null): LengthAwarePaginator
    {
        $selectedCompany = $companyDetail?->id ?? selectedCompany()?->id;

        return MonitoringTask::when($search === '0' || $search === '1', function ($query) use ($search) {
            $query->where('is_enabled', $search);
        })->where('company_id', $selectedCompany)->with(['responsibleRoles', 'company', 'usedFors.type', 'associations'])
            ->orderByDesc('id')
            ->paginate($perPage);
    }

    public function getAll(?CompanyDetail $company = null, ?int $isEnabled = null)
    {
        return MonitoringTask::when($company, function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->when(! is_null($isEnabled), function ($query) use ($isEnabled) {
            $query->where('is_enabled', $isEnabled);
        })->orderByDesc('id')->get();
    }

    public function getMonitoringTaskById($id = null)
    {   
        return MonitoringTask::with('responsibleRoles.assignedRole')
            ->where('id', $id)->first();
    }

    public function getMonitoringTaskStatus(): bool
    {
        return MonitoringTask::where('user_id', auth()->id())->exists();
    }
}
