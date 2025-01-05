<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\LocationPlanUploadData;
use App\Enums\LocationPlan as locationEnum;
use App\Http\Controllers\Controller;
use App\Models\LocationPlan;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\LocationPlanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class LocationPlanController extends Controller
{
    public function __construct(protected LocationPlanService $service,
        protected HaccpRepository $repository,
        protected UserRepository $userRepository,
    ) {}

    public function index(Request $request)
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/LocationPlan', [
            'locationPlan' => $this->repository->getSpecificLocationPlan($request->get('per_page', 10), $this->userRepository->getCompany()),
            'baseUrl' => config('app.url'),
            'isHaccp' => $isHaccp->is_haccp_completed,
        ]);
    }

    public function upload(LocationPlanUploadData $data)
    {
        $this->service->uploadFile($data);

        return to_route('location-plan.index')->with([
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

    public function create()
    {
        return Inertia::render('Haccp/CreateLocationPlan', [
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
