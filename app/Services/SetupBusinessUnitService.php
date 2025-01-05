<?php

namespace App\Services;

use App\Data\Setup\BusinessUnitData;
use App\Models\CompanyDetail;

class SetupBusinessUnitService
{
    public function storeBusinessUnitPlaces(BusinessUnitData $data, int $userId)
    {
        $validatedData = $data->toArray();
        $validatedData['user_id'] = $userId;

        return CompanyDetail::create($validatedData);
    }

    public function updateBusinessUnitPlaces(BusinessUnitData $data, int $businessUnitId)
    {
        $validatedData = $data->toArray();
        $businessUnit = CompanyDetail::findOrFail($businessUnitId);
        $businessUnit->update($validatedData);

        return $businessUnit;
    }

    public function deleteBusinessUnit(CompanyDetail $place): void
    {
        $place->delete();
    }
}
