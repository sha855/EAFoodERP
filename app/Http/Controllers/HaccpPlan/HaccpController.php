<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class HaccpController extends Controller
{
    public function __construct(
        protected UserRepository $user,
        protected HaccpRepository $repository,
        protected UserService $service,
    ) {}

    public function index()
    {
        $isHaccp = $this->user->companyHaccpStatus();

        if ($isHaccp->is_haccp_completed) {
            return Inertia::render(
                'Haccp/GeneralInfo', [
                    'company' => $this->user->getCompanyDetailbyId($this->user->getCompany()),
                    'foodBuisnessType' => $this->repository->getFoodBusinessType(),
                    'isHaccp' => $isHaccp->is_haccp_completed,
                    'translations' => Lang::get('HACCP/GeneralInfo'),
                ]);
        }

        return Inertia::render('Haccp/Index', [
            'businessUnitCompany' => $this->user->getCompanyDetailbyId($this->user->getCompany()),
            'customWorkGroup' => $this->repository->getCustomWorkGroup($this->user->getCompany()),
            'companyWorkgroup' => $this->repository->getCompanyTask($this->user->getCompany()),
            'FoodProduct' => $this->repository->getCompanyFoodProduct($this->user->getCompany()),
            'CompanyProduction' => $this->repository->getCompanyProduction($this->user->getCompany()),
            'companyIngredient' => $this->repository->getCompanyIngredients($this->user->getCompany()),
            'analyses' => $this->repository->getAnalysesDetail($this->user->getCompany()),
            'CompanyActiveProcess' => $this->repository->CompanyActiveProcess($this->user->getCompany()),
            'customProcess' => $this->repository->getCustomProcess($this->user->getCompany()),
            'flowChart' => $this->repository->getflowChart($this->user->getCompany()),
            'locationPlan' => $this->repository->getLocationPlan($this->user->getCompany()),
            'floorPlan' => $this->repository->getFloorPlan($this->user->getCompany()),
            'translations' => Lang::get('HACCP/index'),
        ]);
    }

    public function haccpStatus(CompanyDetail $company)
    {
        $this->service->haccpStatusUpdate($company);

        return to_route('haccp');
    }
}
