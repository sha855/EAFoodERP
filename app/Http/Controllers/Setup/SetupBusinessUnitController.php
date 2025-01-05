<?php

namespace App\Http\Controllers\Setup;

use App\Data\Setup\BusinessUnitData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\FoodBusinessType;
use App\Repositories\LookupRepository;
use App\Repositories\SetupRepository;
use App\Services\CompanySetupService;
use App\Services\SetupBusinessUnitService;
use Inertia\Inertia;

class SetupBusinessUnitController extends Controller
{
    public function __construct(
        protected LookupRepository $lookupRepository,
        protected SetupRepository $repository,
        protected CompanySetupService $service,
        protected SetupBusinessUnitService $businessUnitService
    ) {}

    public function index()
    {
        $companyDetail = CompanyDetail::where('user_id', auth()->id())->latest()->firstOrFail();

        $businessType = FoodBusinessType::all();
        $companies = CompanyDetail::select('user_id', 'company_name')->get();

        return Inertia::render('Setup/BusinessUnitPlaces', [
            'companyDetail' => $companyDetail,
            'businessType' => $businessType,
            'countries' => $this->lookupRepository->getCountries(),
            'timeZones' => timezone_identifiers(),
            'companies' => $companies,
            'dateFormat' => 'Y-m-d',
            'typeOfLocation' => $this->repository->getTypeOfLocation(),
            'numberOfEmployee' => $this->repository->getEmployeeOption(),
            'selectLanguage' => $this->repository->getLanguage(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BusinessUnitData $request)
    {
        $data = BusinessUnitData::from($request->all());
        $userId = auth()->id();

        $this->businessUnitService->storeBusinessUnitPlaces($data, $userId);

        return back()->with([
            'message' => 'Company details saved successfully!',
            'type' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function update(BusinessUnitData $request, int $businessUnitId)
    {
        $data = BusinessUnitData::from($request->all());
        $this->businessUnitService->updateBusinessUnitPlaces($data, $businessUnitId);

        return back()->with([
            'message' => 'Business unit updated successfully!',
            'type' => 'success',
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function destroy(CompanyDetail $place)
    {
        $this->businessUnitService->deleteBusinessUnit($place);

        return back()->with([
            'message' => 'Business unit deleted successfully!',
            'type' => 'success',
        ]);
    }
}
