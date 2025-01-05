<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\FloorPlanUploadData;
use App\Enums\FloorPlanEquipment;
use App\Enums\FloorPlanType;
use App\Http\Controllers\Controller;
use App\Models\FloorPlanFile;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\FloorPlanService;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FloorPlanController extends Controller
{
    public function __construct(protected FloorPlanService $service,
        protected HaccpRepository $repository,
        protected UserRepository $userRepository
    ) {}

    public function index()
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/FloorPlan', [
            'floorType' => FloorPlanType::label(),
            'floorPlans' => $this->repository->getFloorPlan($this->userRepository->getCompany()),
            'baseUrl' => config('app.url'),
            'isHaccp' => $isHaccp->is_haccp_completed,
        ]);
    }

    public function createFloorPlan(string $floorPlan)
    {
        return Inertia::render('Haccp/CreateFloorPlan', [
            'floorType' => FloorPlanType::label(),
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

        return to_route('floor-plan.index')->with([
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
