<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\ProducedFoodArrayData;
use App\Data\HaccpPlan\ProductionVolumeArrayData;
use App\Enums\FoodProduction;
use App\Http\Controllers\Controller;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\ProduceFoodService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class FoodProductController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected UserRepository $userRepository,
        protected ProduceFoodService $service
    ) {}

    public function index()
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/FoodProduct', [
            'companyId' => $this->userRepository->getCompany()->id,
            'producedFood' => $this->repository->producedFood(),
            'companyFoodProduced' => $this->repository->getCompanyFoodProduct($this->userRepository->getCompany()),
            'translations' => Lang::get('HACCP/FoodProduct'),
            'isHaccp' => $isHaccp->is_haccp_completed,
        ]);
    }

    public function productionVolume()
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/ProductionVolume', [
            'companyId' => $this->userRepository->getCompany()->id,
            'companyFoodProduced' => $this->repository->getProductionVolume($this->userRepository->getCompany()),
            'companyProductionVolume' => $this->repository->getCompanyProduction($this->userRepository->getCompany()),
            'translations' => Lang::get('HACCP/FoodProduct'),
            'estimatedVolumes' => FoodProduction::estimatedVolumes(),
            'units' => FoodProduction::units(),
            'periods' => FoodProduction::periods(),
            'anotherCompanyServe' => $this->repository->AnotherCompanyServing($this->userRepository->getCompany()),
            'isHaccp' => $isHaccp->is_haccp_completed,
            'AnotherCompanyProductionVolume' => $this->repository->getOtherProductionVolume($this->userRepository->getCompany())
        ]);

    }

    public function store(ProducedFoodArrayData $data)
    {
        $this->service->productStatusUpdate($data);

        return back()->with([
            'message' => 'Food Business unit product status updated',
            'type' => 'success',
        ]);
    }

    public function updateProductionVolume(ProductionVolumeArrayData $data)
    {
        $this->service->updateProductionVolume($data);

        return back()->with([
            'message' => 'Production volume update',
            'type' => 'success',
        ]);

    }

    public function updateOtherCompanyProductionVolume(ProductionVolumeArrayData $data)
    {
        $this->service->updateOtherProductionVolume($data);

        return back()->with([
            'message' => 'Sell to another Company Production volume update',
            'type' => 'success',
        ]);

    }
}
