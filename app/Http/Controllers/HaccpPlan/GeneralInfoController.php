<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\GeneralInfoData;
use App\Http\Controllers\Controller;
use App\Models\FoodBusinessType;
use App\Repositories\CustomerGroupRepository;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\BusinessUnitService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class GeneralInfoController extends Controller
{
    public function __construct(protected UserRepository $user, protected BusinessUnitService $businessUnitService,
        protected HaccpRepository $repository,
        protected CustomerGroupRepository $customerRepository, ) {}

    public function index()
    {
        $isHaccp = $this->user->companyHaccpStatus();

        return Inertia::render('Haccp/GeneralInfo', [
            'company' => $this->user->getCompanyDetailbyId($this->user->getCompany()),
            'mainCustomerGroup' => $this->customerRepository->getAllMainCustomer(),
            'foodBuisnessType' => $this->repository->getFoodBusinessType(),
            'translations' => Lang::get('HACCP/GeneralInfo'),
            'isHaccp' => $isHaccp->is_haccp_completed,
            'addBuisnessActivity' => $this->repository->getAllBusinessActivity(),
        ]);
    }

    public function store(GeneralInfoData $data)
    {   
        $businessUnit = $this->businessUnitService->create($data);
        if ($businessUnit) {
            return back()->with([
                'message' => 'General Info stored successfully!',
                'type' => 'success',
            ]);
        } else {
            return back()->with([
                'message' => 'Company Name Already Taken',
                'type' => 'error',
            ]);
        }
    }

    public function update(GeneralInfoData $request, $id)
    {
        $data = GeneralInfoData::fromRequest($request);
        $this->businessUnitService->create($data, $id);

        return redirect()->route('haccp.general-Info')->with('success', 'Business unit updated successfully');
    }

    public function buisnessTypeDetail(FoodBusinessType $businessType)
    {
        return response()->json([
            'buisnessUnit' => $businessType->units,
        ]);
    }
}
