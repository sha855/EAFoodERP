<?php

namespace App\Http\Controllers\Admin;

use App\Data\Membership\FeatureHeadingArrayData;
use App\Data\Membership\FeatureHeadingData;
use App\Http\Controllers\Controller;
use App\Models\FeatureHeading;
use App\Repositories\PackageRepository;
use App\Services\PackageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeatureHeadingController extends Controller
{
    public function __construct(protected PackageRepository $packages,
        protected PackageService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/MemberShip/FeatureHeading', [
            'featuresHeading' => $this->packages->getFeaturesHeading($request->get('per_page', 10)),
        ]);
    }

    public function store(FeatureHeadingArrayData $data)
    {
        $this->service->createFeatureHeading($data);

        return back()->with([
            'message' => 'Plan & feature comparison created successfully',
            'type' => 'success',
        ]);
    }

    public function update(FeatureHeadingData $data)
    {
        $this->service->updateFeatureHeading($data);

        return back()->with([
            'message' => 'Feature heading updated successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(FeatureHeading $feature_heading)
    {
        $this->service->deleteFeatureHeading($feature_heading);

        return back()->with([
            'message' => 'Plan & feature deleted successfully',
            'type' => 'success',
        ]);

    }
}
