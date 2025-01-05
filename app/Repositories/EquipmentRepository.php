<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\Equipment;
use Illuminate\Pagination\LengthAwarePaginator;

class EquipmentRepository
{
    public function getEquipments(?CompanyDetail $companyDetail = null, int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        $selectedCompany = $companyDetail?->id ?? selectedCompany()?->id;

        return Equipment::with('room')->when($search === '0' || $search === '1', function ($query) use ($search) {
            $query->where('is_use', $search);
        })
            ->where('company_id', $selectedCompany)
            ->orderByDesc('id')
            ->paginate($perPage);
    }

    public function getAll(?CompanyDetail $company = null, ?int $isUse = null)
    {
        return Equipment::when($company, function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->when(! is_null($isUse), function ($query) use ($isUse) {
            $query->where('is_use', $isUse);
        })->orderByDesc('id')->get();
    }
}
