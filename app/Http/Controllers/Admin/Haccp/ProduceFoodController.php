<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\ProducedFoodArrayData;
use App\Data\HaccpPlan\ProductionVolumeArrayData;
use App\Enums\FoodProduction;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\ProduceFoodService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class ProduceFoodController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected ProduceFoodService $service,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/FoodProduct', [
            'companyId' => $company->id,
            'producedFood' => $this->repository->producedFood(),
            'companyFoodProduced' => $this->repository->getCompanyFoodProduct($company),
            'translations' => Lang::get('HACCP/FoodProduct'),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function productionVolume(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/ProductionVolume', [
            'companyId' => $company->id,
            'companyFoodProduced' => $this->repository->getProductionVolume($company),
            'companyProductionVolume' => $this->repository->getCompanyProduction($company),
            'translations' => Lang::get('HACCP/FoodProduct'),
            'estimatedVolumes' => FoodProduction::estimatedVolumes(),
            'units' => FoodProduction::units(),
            'periods' => FoodProduction::periods(),
            'folders' => $this->folders->getFolders($company),
            'anotherCompanyServe' => $this->repository->AnotherCompanyServing($company),
            'AnotherCompanyProductionVolume' => $this->repository->getOtherProductionVolume($company)
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
}
