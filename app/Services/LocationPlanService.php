<?php

namespace App\Services;

use App\Data\HaccpPlan\LocationPlanUploadData;
use App\Models\LocationPlan;

class LocationPlanService
{
    public function uploadFile(LocationPlanUploadData $data)
    {

        $uploadedFilePaths = [];
        foreach ($data->files as $file) {
            $filePath = $file->store('uploads/locationPlan', 'public');
            LocationPlan::create([
                'name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'company_id' => selectedCompany()->id ?? $data->companyId,
            ]);
            $uploadedFilePaths[] = $filePath;
        }

        return $uploadedFilePaths;

    }

    public function delete(LocationPlan $locatioPlan)
    {
        return $locatioPlan->delete();
    }
}
