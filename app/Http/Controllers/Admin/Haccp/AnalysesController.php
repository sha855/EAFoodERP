<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\AnalysesArrayData;
use App\Enums\AnalysesFrequency;
use App\Enums\WaterSystemAnalyses;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\CustomAnalysesTask;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\AnalysesService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class AnalysesController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected ManageFolderRepository $folders,
        protected AnalysesService $service
    ) {}

    public function index(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/Analyses', [
            'analysesData' => $this->repository->getAnalysesDetail($company),
            'customAnalysesData' => $this->repository->getCustomAnalysesTask($company),
            'analysesFrequencyOptions' => AnalysesFrequency::getOptions(),
            'translations' => Lang::get('HACCP/analyses'),
            'folders' => $this->folders->getFolders($company),
            'companyId' => $company->id,
            'waterSystemAnalyses'  => WaterSystemAnalyses::getOptions(),
        ]);
    }

    public function store(AnalysesArrayData $data)
    {
        $this->service->create($data);

        return back()->with([
            'message' => 'Analyses data Updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(CustomAnalysesTask $analyses)
    {
        $this->service->delete($analyses);

        return back()->with([
            'message' => 'Analyses Deleted Successfully',
            'type' => 'success',
        ]);
    }
}
