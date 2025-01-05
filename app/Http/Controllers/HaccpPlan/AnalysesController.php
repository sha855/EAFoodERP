<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\AnalysesArrayData;
use App\Enums\AnalysesFrequency;
use App\Enums\WaterSystemAnalyses;
use App\Http\Controllers\Controller;
use App\Models\CustomAnalysesTask;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\AnalysesService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class AnalysesController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected UserRepository $userRepository,
        protected AnalysesService $service
    ) {}

    public function index()
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/Analyses', [
            'analysesData' => $this->repository->getAnalysesDetail($this->userRepository->getCompany()),
            'customAnalysesData' => $this->repository->getCustomAnalysesTask($this->userRepository->getCompany()),
            'analysesFrequencyOptions' => AnalysesFrequency::getOptions(),
            'waterSystemAnalyses'  => WaterSystemAnalyses::getOptions(),
            'translations' => Lang::get('HACCP/analyses'),
            'companyId' => $this->userRepository->getCompany()->id,
            'isHaccp' => $isHaccp->is_haccp_completed,
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
