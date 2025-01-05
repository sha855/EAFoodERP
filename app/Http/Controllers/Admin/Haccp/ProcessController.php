<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\CompanyProcessArrayData;
use App\Data\HaccpPlan\FoodProcessData;
use App\Data\HaccpPlan\ProcessUpdateData;
use App\Enums\PotentialHazards;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\AuditTemplateRepository;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\MonitoringRepository;
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
        protected ManageFolderRepository $folders,
    ) {}

    public function index(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/ProcessStep', [
            'process' => $this->repository->getProcessStep($company),
            'customProcess' => $this->repository->getCustomProcess($company),
            'foodHazards' => $this->repository->getFoodHazard($company),
            'process' => $this->repository->CompanyActiveProcess($company),
            'monitoringTask' => $this->monitorRepository->getAll($company),
            'auditTemplate' => $this->auditTemplateRepository->getAuditTemplate($company),
            'translations' => Lang::get('HACCP/ProcessStep'),
            'hazardTypes' => PotentialHazards::types_of_hazards(),
            'likelihood' => PotentialHazards::likelihood_is_rare(),
            'severity' => PotentialHazards::severity_is_insignificant(),
            'riskLevels' => PotentialHazards::risk_level_of_hazards(),
            'companyId' => $company->id,
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function store(FoodProcessData $data)
    {
        $this->service->create($data);

        return back()->with([
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
