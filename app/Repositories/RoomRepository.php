<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\Room;
use Illuminate\Pagination\LengthAwarePaginator;

class RoomRepository
{
    public function getRoom(?CompanyDetail $companyDetail = null, int $perPage = 10, ?string $search = null): LengthAwarePaginator
    {
        $selectedCompany = $companyDetail?->id ?? selectedCompany()?->id;

        return Room::when($search === '0' || $search === '1', function ($query) use ($search) {
            $query->where('is_use', $search);
        })
            ->where('company_id', $selectedCompany)
            ->orderByDesc('id')
            ->paginate($perPage);
    }

    public function getAll(?CompanyDetail $company = null, ?int $isUse = null)
    {
        return Room::when($company, function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->when(! is_null($isUse), function ($query) use ($isUse) {
            $query->where('is_use', $isUse);
        })->orderByDesc('id')->get();
    }
}
