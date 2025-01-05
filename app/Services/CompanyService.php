<?php

namespace App\Services;

use App\Data\Company\CompanyRegistration;
use App\Models\CompanyDetail;

class CompanyService
{
    /**
     * Get all business types with formatted data.
     */
    public function store(CompanyRegistration $dto): ?CompanyDetail
    {
        if (CompanyDetail::where('company_name', $dto->companyName)->exists()) {
            return null;
        }
        CompanyDetail::where([
            'user_id' => auth()->id(),
            'is_selected' => 1,
        ])->update([
            'is_selected' => 0,
        ]);

        $data = array_merge($dto->toArray(), ['is_selected' => 1]);

        return CompanyDetail::updateOrCreate(
            ['user_id' => $dto->userId],
            $data
        );
    }

    public function selectCompany(CompanyDetail $company): void
    {
        CompanyDetail::where('user_id', auth()?->id())->update(['is_selected' => false]);
        $company->update(['is_selected' => true]);
    }
}
