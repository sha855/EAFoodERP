<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\CompanyProcessArrayData;
use App\Data\HaccpPlan\FoodProcessData;
use App\Enums\PotentialHazards;
use App\Http\Controllers\Controller;
use App\Repositories\AuditTemplateRepository;
use App\Repositories\HaccpRepository;
use App\Repositories\MonitoringRepository;
use App\Repositories\UserRepository;
use App\Services\FoodProcessService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class ProcessController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected MonitoringRepository $monitorRepository,
        protected AuditTemplateRepository $auditTemplateRepository,
        protected FoodProcessService $service,
        protected UserRepository $user
    ) {}

    public function index()
    {
        $isHaccp = $this->user->companyHaccpStatus();

        return Inertia::render('Haccp/ProcessStep', [
            'process' => $this->repository->getProcessStep($this->user->getCompany()),
            'inActiveProcess' => $this->repository->getInActiveProcessStep($this->user->getCompany()),
            'foodHazards' => $this->repository->getFoodHazard($this->user->getCompany()),
            'monitoringTask' => $this->monitorRepository->getAll($this->user->getCompany()),
            'auditTemplate' => $this->auditTemplateRepository->getAuditTemplate($this->user->getCompany()),
            'translations' => Lang::get('HACCP/ProcessStep'),
            'hazardTypes' => PotentialHazards::types_of_hazards(),
            'likelihood' => PotentialHazards::likelihood_is_rare(),
            'severity' => PotentialHazards::severity_is_insignificant(),
            'riskLevels' => PotentialHazards::risk_level_of_hazards(),
            'companyId' => $this->user->getCompany()->id,
            'isHaccp' => $isHaccp->is_haccp_completed,
        ]);
    }

    public function store(FoodProcessData $data)
    {
        $this->service->create($data);
        return to_route('haccp.process')->with([
            'message' => 'Food process Data updated successfully',
            'type' => 'success',
        ]);

    }

    public function storeActiveProcess(CompanyProcessArrayData $data)
    {
        $this->service->createActiveProcess($data);
        return back()->with([
            'message' => 'Food Process Status Updated Successfully',
            'type' => 'success',
        ]);

    }
}
