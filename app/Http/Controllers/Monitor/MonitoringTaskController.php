<?php

namespace App\Http\Controllers\Monitor;

use App\Enums\MonitoringTaskSetupEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\Monitoring\MonitoringTaskSetupRequest;
use App\Models\CompanyDetail;
use App\Models\MonitoringTask as MonitoringTaskModel;
use App\Repositories\EquipmentRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\MonitoringRepository;
use App\Repositories\RoomRepository;
use App\Repositories\TeamRepository;
use App\Services\MonitoringService;
use App\Services\MonitoringTaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MonitoringTaskController extends Controller
{
    public function __construct(protected MonitoringRepository $monitoringRepository, protected MonitoringService $MonitoringService, protected RoomRepository $roomRepository, protected EquipmentRepository $equipmentRepository, protected TeamRepository $teamRepository, protected MonitoringTaskService $monitoringTaskService, protected ManageFolderRepository $folders) {}

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Monitor/Task', [
            'monitoringTasks' => $this->monitoringRepository->getMonitoringTask(null, $perPage, $search),
            'taskCreateData' => $this->getTaskCreateData(),
        ]);
    }

    public function show(Request $request, CompanyDetail $company)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Admin/Monitor/index', [
            'monitoringTasks' => $this->monitoringRepository->getMonitoringTask($company, $perPage, $search),
            'taskCreateData' => $this->getTaskCreateData(),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function taskStatus(Request $request, MonitoringTaskModel $monitoring)
    {
        $this->monitoringTaskService->updateStatus($monitoring, $request->is_enabled);
    }

    public function createOrUpdateMonitoringTask(MonitoringTaskSetupRequest $request, ?CompanyDetail $company)
    {
        $this->monitoringTaskService->createOrUpdate($company, $request->all());

        return back()->with([
            'message' => 'Task create successfully!',
            'type' => 'success',
        ]);
    }

    public function setupMonitoringTask(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Setup/Monitoring/Index', [
            'monitoringTasks' => $this->monitoringRepository->getMonitoringTask(null, $perPage, $search),
            'taskCreateData' => $this->getTaskCreateData(),
        ]);
    }

    public function appDownload(Request $request)
    {
        return Inertia::render('Setup/Monitoring/AppDownload');
    }

    public function verification(Request $request)
    {
        return Inertia::render('Setup/Monitoring/Verification');
    }

    public function demo()
    {
        return Inertia::render('Setup/Monitoring/Demo');
    }

    private function getTaskCreateData(): array
    {
        return [
            'type' => MonitoringTaskSetupEnum::type(),
            'taskRelatedOptions' => MonitoringTaskSetupEnum::taskRelatedOptions(),
            'checklistNoneList' => MonitoringTaskSetupEnum::checklistNoneList(),
            'taskDetails' => MonitoringTaskSetupEnum::taskDetails(),
            'fields' => MonitoringTaskSetupEnum::fields(),
            'assignTaskTo' => $this->teamRepository->getFeaturedRole(selectedCompany()),
            'rooms' => $this->roomRepository->getAll(selectedCompany(), 1),
            'equipments' => $this->equipmentRepository->getAll(selectedCompany(), 1),
        ];
    }

    public function destroy(MonitoringTaskModel $monitoringTask)
    {
        $monitoringTask->delete();

        return back()->with([
            'message' => 'Task delete successfully!',
            'type' => 'success',
        ]);
    }
}
