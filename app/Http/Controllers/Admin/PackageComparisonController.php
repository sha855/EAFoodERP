<?php

namespace App\Http\Controllers\Admin;

use App\Data\Membership\PackageComparisonData;
use App\Http\Controllers\Controller;
use App\Models\PackageComparison;
use App\Repositories\PackageRepository;
use App\Services\PackageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageComparisonController extends Controller
{
    public function __construct(protected PackageRepository $packages,
        protected PackageService $service
    ) {}

    public function index(Request $request)
    {

        return Inertia::render('Admin/MemberShip/FeatureComparison', [
            'featuresComparison' => $this->packages->getFeatureComparison($request->get('per_page', 10)),
            'plans' => $this->packages->getPackageData(),
            'featuresHeading' => $this->packages->getFeaturesHeading(),
            'features' => $this->packages->getFeatures($request->get('per_page', 10)),
        ]);
    }

    public function store(PackageComparisonData $data)
    {
        $this->service->createPackageComparison($data);

        return back()->with([
            'message' => 'Plan & feature comparison created successfully',
            'type' => 'success',
        ]);
    }

    public function update(PackageComparisonData $data)
    {

        $this->service->updateComparison($data);

        return back()->with([
            'message' => 'Feature comparison updated successfully',
            'type' => 'success',
        ]);

    }

    public function destroy(PackageComparison $feature_comparison)
    {
        $this->service->deletePackageComparison($feature_comparison);

        return back()->with([
            'message' => 'Plan & feature deleted successfully',
            'type' => 'success',
        ]);
    }
}
