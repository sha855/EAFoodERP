<?php

namespace App\Repositories;

use App\Models\ApiAccessToken;
use App\Models\CompanyDetail;

class ApiAccessTokenRepository
{
    public function getAll(?CompanyDetail $companyDetail = null, int $perPage = 10, ?string $search = null)
    {
        $selectedCompany = $companyDetail?->id ?? selectedCompany()?->id;

        return ApiAccessToken::where('company_id', $selectedCompany)->with(['user', 'company'])->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function findById(int $id): ?ApiAccessToken
    {
        return ApiAccessToken::find($id);
    }
}
