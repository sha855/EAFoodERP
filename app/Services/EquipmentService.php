<?php

namespace App\Services;

use App\Data\Setup\EquipmentData;
use App\Models\CompanyDetail;
use App\Models\Equipment;

class EquipmentService
{
    public function createOrUpdateEquipment(?CompanyDetail $company, EquipmentData $data): ?Equipment
    {
        $dataArray = $data->toArray();
        $dataArray['company_id'] = $company?->id ?? selectedCompany()?->id;

        return Equipment::updateOrCreate(
            ['id' => $dataArray['id'] ?? null],
            $dataArray
        );
    }

    public function updateIsUse(Equipment $equipment, $isUse): void
    {
        $equipment->is_use = $isUse;
        $equipment->save();
    }

    public function destroyEquipment(Equipment $equipment): void
    {
        $equipment->delete();
    }
}
