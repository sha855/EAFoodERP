<?php

namespace App\Http\Controllers;

use App\Data\Company\CompanyRegistration;
use App\Enums\EmployeeOptionsEnum;
use App\Enums\LocationOptions;
use App\Models\CompanyDetail;
use App\Repositories\LookupRepository;
use App\Services\CompanyService;
use Inertia\Inertia;

class CompanyController extends Controller
{
    public function __construct(protected LookupRepository $lookupRepo,
        protected CompanyService $service) {}

    public function store(CompanyRegistration $data)
    {
        $company = $this->service->store($data);
        if (! $company) {
            return response()->json(['errors' => ['company_name' => ['Company Name Taken']]], 422);
        }

        return response()->json(['message' => 'Company registered successfully!'], 201);
    }

    public function companyRegister()
    {

        $businessTypes = $this->lookupRepo->getBusinessTypes();
        $countries = $this->lookupRepo->getCountries();

        return Inertia::render('Company/RegisterCompany', [
            'businessTypes' => $businessTypes,
            'countries' => $countries,
            'employeeOptions' => EmployeeOptionsEnum::options(),
            'locationOptions' => LocationOptions::options(),
        ]);
    }

    public function getState($code)
    {
        return $this->lookupRepo->getStates($code);
    }

    public function phoneUpdate()
    {
        $countryCodes = $this->lookupRepo->getStdCode();

        return Inertia::render('Company/FinalPhoneRegister', [
            'countryCodes' => $countryCodes,
        ]);
    }

    public function setCompany(CompanyDetail $company)
    {
        $this->service->selectCompany($company);

        return back()->with([
            'message' => 'Company changed successfully!',
            'type' => 'success',
        ]);
    }
}
