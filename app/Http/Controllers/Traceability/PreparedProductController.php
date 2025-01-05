<?php

namespace App\Http\Controllers\Traceability;

use App\Data\Traceability\PreparedProductArrayData;
use App\Http\Controllers\Controller;
use App\Repositories\PreparedProductRepository;
use App\Repositories\TraceabilityRepository;
use App\Repositories\UserRepository;
use App\Services\PreparedFoodService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreparedProductController extends Controller
{
    public function __construct(protected PreparedFoodService $service,
    protected TraceabilityRepository $traceabilityRepository,
    protected PreparedProductRepository $repository,
    protected UserRepository $userRepository,) {}

    public function index(Request $request)
    {
        return Inertia::render('TraceAbility/Index', [
            'product_recipe' => $this->traceabilityRepository->getProductrecipes(),
            'preparedProduct' => $this->repository->getProductPreparation(selectedCompany(), $request->get('per_page', 10),),
            'companyId'      => $this->userRepository->getCompany()->id,
        ]);
    }

    public function store(PreparedProductArrayData $data)
    {
        $this->service->storeProductRecipe($data);
        return redirect()->back()->with([
            'message' => 'Product recipe stored successfully!',
            'type' => 'success',
        ]);
    }

    public function update(PreparedProductArrayData $data)
    {
        $this->service->updateProductRecipe($data);
        return redirect()->back()->with([
            'message' => 'Product recipe updated successfully!',
            'type' => 'success',
        ]);
    }

}
