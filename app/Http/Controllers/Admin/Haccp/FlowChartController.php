<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\FlowChartProcessArrayData;
use App\Data\HaccpPlan\FlowChartUploadData;
use App\Enums\FlowChartEnum;
use App\Enums\PotentialHazards;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\FlowChart;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\FlowChartService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FlowChartController extends Controller
{
    public function __construct(protected FlowChartService $service,
        protected HaccpRepository $repository, protected ManageFolderRepository $folders,
    ) {}

    public function index(Request $request, CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/FlowChart', [
            'companyId' => $company->id,
            'flowCharts' => $this->repository->getSpecificflowChart($request->get('per_page', 10), $company),
            'baseUrl' => config('app.url'),
            'riskLevels' => PotentialHazards::risk_level_of_hazards(),
            'folders' => $this->folders->getFolders($company),
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

    public function createFlowChart(CompanyDetail $company)
    {

        return Inertia::render('Admin/Haccp/CreateFlowChart', [
            'companyId' => $company->id,
            'flowCharts' => $this->repository->getflowChart($company),
            'riskLevels' => PotentialHazards::risk_level_of_hazards(),
            'initialNodes' => FlowChartEnum::initialNodes(),
            'initialEdges' => FlowChartEnum::initialEdges(),
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

    public function storeFlowChartProcess(FlowChartProcessArrayData $flowChartProcess)
    {
        $this->service->flowChartProcessStore($flowChartProcess);

        return to_route('admin.company.flow.chart', ['company' => $flowChartProcess->companyId])->with([
            'message' => 'Flow chart Process Step Created Successfully',
            'type' => 'success',
        ]);
    }
}
