<?php

namespace App\Services;

use App\Data\HaccpPlan\AnalysesArrayData;
use App\Models\CompanyAnalysesTask;
use App\Models\CustomAnalysesTask;

class AnalysesService
{
    public function Create(AnalysesArrayData $data)
    {
        foreach ($data->analyses as $analysis) {
            $model = $analysis->isNew ? CustomAnalysesTask::class : CompanyAnalysesTask::class;

            $model::updateOrCreate(
                ['id' => $analysis->id],
                $analysis->toArray()
            );
        }
    }

    public function delete(CustomAnalysesTask $analyses)
    {
        return $analyses->delete();
    }
}
