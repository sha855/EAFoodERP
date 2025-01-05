<?php

namespace App\Http\Controllers\Admin;

use App\Data\FoodBuisness\FoodBusinessTypeArrayData;
use App\Data\FoodBuisness\FoodBusinessTypeData;
use App\Http\Controllers\Controller;
use App\Models\FoodBusinessType;
use App\Repositories\HaccpRepository;
use App\Services\FoodService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FoodController extends Controller
{
    public function __construct(protected HaccpRepository $repository,
        protected FoodService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/Food/Index', [
            'foodBusinessTypes' => $this->repository->getFoodBusiness($request->get('per_page', 10)),
        ]);
    }

    public function store(FoodBusinessTypeArrayData $data)
    {
        $this->service->create($data);

        return back()->with([
            'message' => 'Business type created Successfully',
            'type' => 'success',
        ]);
    }

    public function show(FoodBusinessType $food)
    {
        return Inertia::render('Admin/Food/View', [
            'foodBusinesses' => $this->repository->getFoodBusinessById($food),
        ]);
    }

    public function update(FoodBusinessTypeData $data, FoodBusinessType $food)
    {
        $this->service->update($data, $food);

        return back()->with([
            'message' => 'Business type updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(FoodBusinessType $food)
    {
        $this->service->foodTypeDelete($food);

        return back()->with([
            'message' => 'Business type deleted Successfully',
            'type' => 'success',
        ]);
    }
}
