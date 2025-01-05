<?php

namespace App\Services;

use App\Data\HaccpPlan\FloorPlanUploadData;
use App\Models\FloorPlan;
use App\Models\FloorPlanFile;

class FloorPlanService
{
    public function uploadFile(FloorPlanUploadData $data)
    {
        $floorPlan = FloorPlan::create(['company_id' => selectedCompany()->id ?? $data->companyId,
            'floor_plan' => $data->floorPlan,
            'is_active' => $data->isActive,
        ]);
        $uploadedFilePaths = [];
        foreach ($data->files as $file) {
            $filePath = $file->store('uploads/floorPlan', 'public');
            FloorPlanFile::create([
                'name' => $file->getClientOriginalName(),
                'floor_plan_id' => $floorPlan->id,
                'file_path' => $filePath,
            ]);
            $uploadedFilePaths[] = $filePath;
        }

        return $uploadedFilePaths;

    }

    public function floorStatusUpdate(FloorPlanUploadData $data)
    {
        return FloorPlan::updateOrCreate(['id' => $data->id],
            ['company_id' => selectedCompany()->id ?? $data->companyId,
                'floor_plan' => $data->floorPlan,
                'is_active' => $data->isActive,
            ]);
    }

    public function delete(FloorPlanFile $floorPlan)
    {
        return $floorPlan->delete();
    }
}
