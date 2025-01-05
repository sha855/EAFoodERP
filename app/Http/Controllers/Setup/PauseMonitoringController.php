<?php

namespace App\Http\Controllers\Setup;

use App\Data\PauseMonitoring\PauseMonitoringData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\ManageFolderRepository;
use App\Repositories\PauseMonitoringRepository;
use App\Repositories\UserRepository;
use App\Services\PauseMonitoringService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PauseMonitoringController extends Controller
{
    public function __construct(
        protected PauseMonitoringRepository $pauseMonitoringRepository,
        protected UserRepository $userRepository,
        protected PauseMonitoringService $service,
        protected ManageFolderRepository $folders
    ) {}

    public function index(Request $request)
    {
        $pauseTasks = $this->pauseMonitoringRepository->getAllPausedTasks(
            $this->userRepository->getCompany(),
            $request->get('per_page', 10)
        );

        $allTasks = $this->pauseMonitoringRepository->getAllTasks();

        return Inertia::render('Setup/PauseMonitoring/Index', [
            'allTasks' => $allTasks,
            'pauseTasks' => $pauseTasks,
            'companyId' => selectedCompany()->id,
        ]);
    }

    public function store(PauseMonitoringData $data, CompanyDetail $company)
    {
        $data->companyId = $company->id;
        $this->service->create($data->toArray());

        return back()->with([
            'message' => __('PauseMonitoring/Messages.task.created'),
            'type' => 'success',
        ]);
    }

    public function update($id, PauseMonitoringData $data)
    {
        $this->service->update($id, $data);

        return back()->with([
            'message' => __('PauseMonitoring/Messages.task.updated'),
            'type' => 'success',
        ]);
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return back()->with([
            'message' => __('PauseMonitoring/Messages.task.deleted'),
            'type' => 'success',
        ]);
    }

    public function show(Request $request, CompanyDetail $company)
    {
        $pauseTasks = $this->pauseMonitoringRepository->getAllPausedTasks(
            $company,
            $request->get('per_page', 10)
        );

        $allTasks = $this->pauseMonitoringRepository->getAllTasks();

        return Inertia::render('Admin/Setup/PauseMonitoring/Index', [
            'allTasks' => $allTasks,
            'pauseTasks' => $pauseTasks,
            'companyId' => $company->id,
            'folders' => $this->folders->getFolders($company),
        ]);
    }
}
