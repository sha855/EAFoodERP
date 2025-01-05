<?php

namespace App\Http\Controllers\Setup;

use App\Http\Controllers\Controller;
use App\Repositories\MonitoringRepository;
use Inertia\Inertia;

class MonitoringTaskHistoryController extends Controller
{
    public function __construct(

        protected MonitoringRepository $monitoringRepository,
    ) {}

    public function index()
    {
        return Inertia::render('Setup/MonitoringTaskHistory/Index', [
            'monitoringTasks' => $this->monitoringRepository->getMonitoringTask(),
        ]);
    }

    public function formList($id)
    {
        return inertia('Setup/MonitoringTaskHistory/TaskHitoryList', [
            'task' => $this->monitoringRepository->getMonitoringTaskById($id),
            'tasks' => $this->monitoringRepository->getMonitoringTask(),
        ]);
    }
}
