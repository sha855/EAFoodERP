<?php

namespace App\Http\Controllers\Admin;

use App\Data\FoodBuisness\BusinessActivityArrayData;
use App\Data\FoodBuisness\BusinessActivityData;
use App\Http\Controllers\Controller;
use App\Models\FoodBusinessUnit;
use App\Models\Package;
use App\Repositories\HaccpRepository;
use App\Services\FoodService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BusinessUnitController extends Controller
{
    public function __construct(protected HaccpRepository $repository,
        protected FoodService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/BusinessUnit/Index', [
            'foodBusinessTypes' => $this->repository->getFoodBusinessType(),
            'foodBusinessUnit' => $this->repository->getFoodBusinessUnit($request->get('per_page', 10)),
        ]);
    }

    public function store(BusinessActivityArrayData $data)
    {
        $this->service->createBusinessUnit($data);

        return back()->with([
            'message' => 'Business unit stored Successfully',
            'type' => 'success',
        ]);
    }

    public function show(Package $package)
    {
        //
    }

    public function update(BusinessActivityData $data, FoodBusinessUnit $business_unit)
    {
        $this->service->updateBusinessUnit($data, $business_unit);

        return back()->with([
            'message' => 'Business unit updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(FoodBusinessUnit $business_unit)
    {
        $this->service->foodUnitdelete($business_unit);

        return back()->with([
            'message' => 'Business unit deleted Successfully',
            'type' => 'success',
        ]);
    }
}
