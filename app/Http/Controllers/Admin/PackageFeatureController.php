<?php

namespace App\Http\Controllers\Admin;

use App\Data\Membership\PackageFeatureArrayData;
use App\Data\Membership\PackageFeatureData;
use App\Http\Controllers\Controller;
use App\Models\PackageFeature;
use App\Repositories\PackageRepository;
use App\Services\PackageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageFeatureController extends Controller
{
    public function __construct(protected PackageRepository $packages,
        protected PackageService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/MemberShip/Features', [
            'features' => $this->packages->getFeatures($request->get('per_page', 10)),
            'plans' => $this->packages->getPackageData(),
            'featuresHeading' => $this->packages->getAllFeaturesHeading(),
        ]);
    }

    public function store(PackageFeatureArrayData $data)
    {
        $this->service->createFeature($data);

        return back()->with([
            'message' => 'Features Created Successfully',
            'type' => 'success',
        ]);
    }

    public function update(PackageFeatureData $data)
    {
        $this->service->featureUpdate($data);

        return back()->with([
            'message' => 'Features Updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(PackageFeature $feature)
    {
        $this->service->deleteFeature($feature);

        return back()->with([
            'message' => 'Features deleted Successfully',
            'type' => 'success',
        ]);

    }
}
