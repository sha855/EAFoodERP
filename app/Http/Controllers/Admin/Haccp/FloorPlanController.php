<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\FloorPlanUploadData;
use App\Enums\FloorPlanEquipment;
use App\Enums\FloorPlanType;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\FloorPlanFile;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\FloorPlanService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FloorPlanController extends Controller
{
    public function __construct(protected FloorPlanService $service,
        protected HaccpRepository $repository,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/FloorPlan', [
            'floorType' => FloorPlanType::label(),
            'companyId' => $company->id,
            'floorPlans' => $this->repository->getFloorPlan($company),
            'folders' => $this->folders->getFolders($company),
            'baseUrl' => config('app.url'),
        ]);
    }

    public function create(string $floorPlan, CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/CreateFloorPlan', [
            'floorType' => FloorPlanType::label(),
            'companyId' => $company,
            'floorPlan' => $floorPlan,
            'floorPlanEquipment' => FloorPlanEquipment::equipment(),
            'baseUrl' => config('app.url'),
        ]);

    }

    public function statusUpdate(FloorPlanUploadData $data)
    {
        $this->service->floorStatusUpdate($data);

        return back()->with([
            'message' => 'floor Plan status Updated Successfully',
            'type' => 'success',
        ]);

    }

    public function upload(FloorPlanUploadData $data)
    {
        $this->service->uploadFile($data);

        return to_route('admin.company.floor.plan', ['company' => $data->companyId])->with([
            'message' => 'Floor plan uploaded successfully',
            'type' => 'success',
        ]);
    }

    public function download($file)
    {
        $filePath = 'uploads/floorPlan/'.$file;

        if (! Storage::disk('public')->exists($filePath)) {
            return back()->with([
                'message' => 'floor plan not uploaded, Something error',
                'type' => 'error',
            ]);
        }

        return Storage::disk('public')->download($filePath);
    }

    public function destroy(FloorPlanFile $floorPlan)
    {
        $this->service->delete($floorPlan);

        return back()->with([
            'message' => 'floor plan deleted Successfully',
            'type' => 'success',
        ]);
    }
}
