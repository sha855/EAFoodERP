<?php

namespace App\Http\Controllers\Admin;

use App\Data\FoodBuisness\BusinessActivityArrayData;
use App\Data\FoodBuisness\BusinessActivityData;
use App\Http\Controllers\Controller;
use App\Models\AdditionalBusinessActivity;
use App\Repositories\HaccpRepository;
use App\Services\FoodService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessActivityController extends Controller
{
    public function __construct(protected HaccpRepository $repository,
        protected FoodService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/BusinessActivity/Index', [
            'businessActivity' => $this->repository->getFoodBusinessActivity($request->get('per_page', 10)),
            'foodBusinessTypes' => $this->repository->getFoodBusinessType(),
        ]);
    }

    public function store(BusinessActivityArrayData $data)
    {
        $this->service->createBusinessActivity($data);

        return back()->with([
            'message' => 'Business Activity Created Successfully',
            'type' => 'success',
        ]);
    }

    public function update(BusinessActivityData $data, AdditionalBusinessActivity $business_activity)
    {
        $this->service->updateBusinessActivity($data, $business_activity);

        return back()->with([
            'message' => 'Business Activity Updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(AdditionalBusinessActivity $business_activity)
    {
        $this->service->businessActivityDelete($business_activity);

        return back()->with([
            'message' => 'Business Activity deleted Successfully',
            'type' => 'success',
        ]);
    }
}
