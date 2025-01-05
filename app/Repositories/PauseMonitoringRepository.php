<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\MonitoringTask;
use App\Models\PauseMonitoring;

class PauseMonitoringRepository
{
    public function getAllTasks()
    {
        return MonitoringTask::select('id AS monitoring_task_id', 'name')->get();
    }

    public function getAllPausedTasks(?CompanyDetail $companyDetail = null, int $perPage = 10, ?string $search = null)
    {
        $selectedCompany = $companyDetail?->id ?? selectedCompany()?->id;
        $pauseMonitoring = PauseMonitoring::where('company_id', $selectedCompany)->with('monitoringTask', 'analysesTask', 'user')->orderBy('id', 'desc')
            ->paginate($perPage);
        $data = $pauseMonitoring->toArray();
        $data['data'] = array_map(function ($val) {
            if (isset($val['monitoring_task']['monitoring_task'])) {
                $val['name'] = $val['monitoring_task']['monitoring_task'];
            } elseif (isset($val['analyses_task']['task_name'])) {
                $val['name'] = $val['analyses_task']['task_name'];
            }

            return $val;
        }, $data['data']);

        return $data;
    }

    public function getCompanyUserTask(CompanyDetail $company)
    {
        return PauseMonitoring::with('monitoringTask')->where('company_id', $company->id)->get();
    }
}
