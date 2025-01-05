<?php

namespace App\Services;

use App\Data\Monitor\MonitoringTask;
use App\Models\MonitoringUserTask;
use Illuminate\Support\Facades\Auth;

class MonitoringService
{
    public static function taskStatuUpdate(MonitoringTask $data)
    {
        if ($data->is_enabled) {
            MonitoringUserTask::Create(
                [
                    'monitoring_task_id' => $data->task_id,
                    'user_id' => Auth::id(),
                    'company_id' => selectedCompany()->id,
                    'is_enabled' => $data->is_enabled,
                ]
            );

            return 'Task Activated';
        } else {

            MonitoringUserTask::Where([
                'monitoring_task_id' => $data->task_id,
                'company_id' => selectedCompany()->id,
            ])->delete();

            return 'Task Deactivated';
        }
    }
}
