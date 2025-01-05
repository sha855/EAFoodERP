<?php

namespace App\Services;

use App\Data\Setup\CompanySetup;
use App\Models\CompanyDetail;

class CompanySetupService
{
    /**
     * Get all business types with formatted data.
     *
     * @return \Illuminate\Support\Collection
     */
    public function create(CompanySetup $data): ?CompanyDetail
    {
        if (CompanyDetail::where('company_name', $data->companyName)->exists()) {
            return null;
        }
        CompanyDetail::where([
            'user_id' => $data->userId ?? auth()->id(),
            'is_selected' => 1,
        ])->update([
            'is_selected' => 0,
        ]);

        $dataArray = array_merge($data->toArray(), [
            'user_id' => $data->userId ?? auth()->id(),
            'is_selected' => 1,
        ]);

        return CompanyDetail::create($dataArray);
    }

    public function update(CompanySetup $data, $company)
    {
        if (CompanyDetail::where('company_name', $data->companyName)
            ->where('id', '!=', $company)
            ->exists()
        ) {
            return null;
        }

        $companyDetail = CompanyDetail::findOrFail($company);

        $dataArray = $data->toArray();
        $dataArray['user_id'] = $data->userId ?? auth()->id();

        return $companyDetail->update($dataArray);
    }

    public function delete(CompanyDetail $company)
    {
        return $company->delete();
    }
}
