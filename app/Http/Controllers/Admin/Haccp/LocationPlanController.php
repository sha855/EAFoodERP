<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\LocationPlanUploadData;
use App\Enums\LocationPlan as locationEnum;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\LocationPlan;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\LocationPlanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocationPlanController extends Controller
{
    public function __construct(protected LocationPlanService $service,
        protected HaccpRepository $repository,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(Request $request, CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/LocationPlan', [
            'companyId' => $company->id,
            'locationPlan' => $this->repository->getSpecificLocationPlan($request->get('per_page', 10), $company),
            'baseUrl' => config('app.url'),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function upload(LocationPlanUploadData $data)
    {
        $this->service->uploadFile($data);

        return to_route('admin.company.location.plan', ['company' => $data->companyId])->with([
            'message' => 'Flow chart uploaded successfully',
            'type' => 'success',
        ]);
    }

    public function download($file)
    {
        $filePath = 'uploads/locationPlan/'.$file;

        if (! Storage::disk('public')->exists($filePath)) {
            return back()->with([
                'message' => 'Location plan not uploaded, Something error',
                'type' => 'error',
            ]);
        }

        return Storage::disk('public')->download($filePath);
    }

    public function createLocationPlan(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/CreateLocationPlan', [
            'companyId' => $company->id,
            'flowCharts' => $this->repository->getflowChart($company),
            'baseUrl' => config('app.url'),
            'locationField' => locationEnum::getInputFields(),
            'routeField' => locationEnum::getRouteFields(),
        ]);
    }

    public function destroy(LocationPlan $locationPlan)
    {
        $this->service->delete($locationPlan);

        return back()->with([
            'message' => 'Flow chart deleted Successfully',
            'type' => 'success',
        ]);
    }
}
