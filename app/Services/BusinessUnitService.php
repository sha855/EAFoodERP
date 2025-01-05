<?php

namespace App\Services;

use App\Data\HaccpPlan\GeneralInfoData;
use App\Models\BusinessUnit;
use App\Models\CompanyDetail;
use App\Repositories\BusinessUnitRepository;
use Illuminate\Support\Facades\Auth;

class BusinessUnitService
{
    public function __construct(protected BusinessUnitRepository $repository) {}

    public function create(GeneralInfoData $data): ?array
    {
        $common_id = $data->id ?: Auth::id();

        if ($data->id) {
            $companyDetail = CompanyDetail::where('id', $common_id)->first();
        } else {
            $companyDetail = CompanyDetail::where('user_id', $common_id)->first();
        }

        if (CompanyDetail::where('company_name', $data->companyName)
            ->where('id', '!=', $companyDetail->id)
            ->exists()
        ) {
            return null;
        }
        $companyDetail->update([
            'company_name' => $data->companyName,
            'company_registration_number' => $data->companyRegistrationNumber,
            'address' => $data->address,
        ]);
        $dataArray = $data->toArray();
        $dataArray['user_id'] = $companyDetail->user_id;
        $dataArray['company_id'] = $companyDetail->id ?? $this->repository->getCompanyId();
        $dataArray['additional_business_activity_id'] = json_encode($data->additionalBusinessActivityId);
        $dataArray['address'] = $data->businessUnitAddress;
        BusinessUnit::updateOrCreate(
            ['id' => $data->businessUnitId],
            $dataArray);

        return $dataArray;
    }
}
