<?php

namespace App\Http\Controllers\Setup;

use App\Data\Setup\CompanySetup;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\HaccpRepository;
use App\Repositories\LookupRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\SetupRepository;
use App\Services\CompanySetupService;
use Inertia\Inertia;

class SetupCompanyController extends Controller
{
    public function __construct(
        protected LookupRepository $lookupRepository,
        protected SetupRepository $repository,
        protected CompanySetupService $service,
        protected HaccpRepository $haccpRepository,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(?CompanyDetail $company)
    {
        return Inertia::render('Setup/SetupCompany', [
            'languages' => $this->repository->getLanguages(),
            'dateFormat' => $this->repository->getDateFormat(),
            'company' => $this->repository->getUserCompany($company),
            'foodBusinessType' => $this->haccpRepository->getFoodBusinessType(),
            'countries' => $this->lookupRepository->getCountries(),
            'volumeUnit' => $this->repository->getVolumeUnit(),
            'weightUnits' => $this->repository->getWeightUnit(),
            'temperatureUnit' => $this->repository->getTemperatureUnit(),
            'monitoring' => $this->repository->getMonitoring(),
            'temperaturePrefill' => $this->repository->getTemperaturePrefill(),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function store(CompanySetup $data)
    {
        $company = $this->service->create($data);

        if (auth()->user()->hasRole('admin')) {
            return to_route('admin.company.detail', ['company' => $company->id])->with([
                'message' => 'Company Created Successfully',
                'type' => 'success',
            ]);
        }

        return to_route('setup.companies')->with([
            'message' => 'Company Created Successfully',
            'type' => 'success',
        ]);
    }

    public function update(CompanySetup $data, $company)
    {
        $company = $this->service->update($data, $company);
        if (! $company) {
            return back()->with([
                'message' => 'Company Name Already Taken',
                'type' => 'error',
            ]);
        }
        $successMessage = [
            'message' => 'Company Updated Successfully',
            'type' => 'success',
        ];
        if (auth()->user()->hasRole('admin')) {
            return to_route('admin.all.companies')->with($successMessage);
        }

        return back()->with($successMessage);
    }

    public function destroy(CompanyDetail $company)
    {

        $this->service->delete($company);

        return to_route('admin.all.companies')->with([
            'message' => 'Company Deleted Successfully',
            'type' => 'success',
        ]);

    }
}
