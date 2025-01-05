<?php

namespace App\Services;

use App\Data\PauseMonitoring\PauseMonitoringData;
use App\Models\CompanyDetail;
use App\Models\PauseMonitoring;

class PauseMonitoringService
{
    public function create(array $data): PauseMonitoring
    {
        $companyDetail = CompanyDetail::where('id', $data['company_id'] ?? selectedCompany()->id)->first();
        $data['user_id'] = $companyDetail->user_id;
        $data['company_id'] = $companyDetail->id;

        return PauseMonitoring::create($data);
    }

    public function delete(int $id): bool
    {
        $pauseTask = PauseMonitoring::find($id);
        if ($pauseTask) {
            return $pauseTask->delete();
        }

        return false;
    }

    public function update(int $id, PauseMonitoringData $data): PauseMonitoring
    {
        $pauseTaskData = $data->toArray();
        $companyDetail = CompanyDetail::where('id', $pauseTaskData['company_id'] ?? selectedCompany()->id)->first();
        $pauseTaskData['user_id'] = $companyDetail->user_id;
        $pauseTaskData['company_id'] = $companyDetail->id;
        $pauseTask = PauseMonitoring::findOrFail($id);
        $pauseTask->update($pauseTaskData);

        return $pauseTask;
    }
}
