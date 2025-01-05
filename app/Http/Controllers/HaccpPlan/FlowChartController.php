<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\FlowChartProcessArrayData;
use App\Data\HaccpPlan\FlowChartUploadData;
use App\Enums\FlowChartEnum;
use App\Enums\PotentialHazards;
use App\Http\Controllers\Controller;
use App\Models\FlowChart;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\FlowChartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FlowChartController extends Controller
{
    public function __construct(protected FlowChartService $service,
        protected HaccpRepository $repository,
        protected UserRepository $userRepository
    ) {}

    public function index(Request $request)
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/FlowChart', [
            'flowCharts' => $this->repository->getSpecificflowChart($request->get('per_page', 10), $this->userRepository->getCompany()),
            'baseUrl' => config('app.url'),
            'riskLevels' => PotentialHazards::risk_level_of_hazards(),
            'isHaccp' => $isHaccp->is_haccp_completed,
        ]);
    }

    public function store(FlowChartProcessArrayData $flowChartProcess)
    {
        $this->service->flowChartProcessStore($flowChartProcess);

        return to_route('flow-chart.index')->with([
            'message' => 'Flow chart Process Step Created Successfully',
            'type' => 'success',
        ]);
    }

    public function upload(FlowChartUploadData $data)
    {
        $this->service->uploadFile($data);

        return back()->with([
            'message' => 'Flow chart uploaded Successfully',
            'type' => 'success',
        ]);
    }

    public function download($file)
    {
        $filePath = 'uploads/flowChart/'.$file;
        if (! Storage::disk('public')->exists($filePath)) {
            return back()->with([
                'message' => 'Flow chart not found, Something error',
                'type' => 'error',
            ]);
        }

        return Storage::disk('public')->download($filePath);
    }

    public function create()
    {
        return Inertia::render('Haccp/CreateFlowChart', [
            'flowCharts' => $this->repository->getflowChart($this->userRepository->getCompany()),
            'riskLevels' => PotentialHazards::risk_level_of_hazards(),
            'initialNodes' => FlowChartEnum::initialNodes(),
            'initialEdges' => FlowChartEnum::initialEdges(),
            'companyId' => selectedCompany()->id,
        ]);
    }

    public function destroy(FlowChart $flowChart)
    {
        $this->service->delete($flowChart);

        return back()->with([
            'message' => 'Flow chart deleted Successfully',
            'type' => 'success',
        ]);
    }
}
