<?php

namespace App\Http\Controllers\Admin;

use App\Data\Users\CreateCompanyUserData;
use App\Data\Users\UpdateUser;
use App\Enums\EmployeeOptionsEnum;
use App\Enums\LocationOptions;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\User;
use App\Repositories\CustomerGroupRepository;
use App\Repositories\HaccpRepository;
use App\Repositories\LookupRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\SetupRepository;
use App\Repositories\UserRepository;
use App\Services\EmailService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function __construct(protected UserRepository $user,
        protected UserService $service, protected LookupRepository $lookupRepo,
        protected HaccpRepository $repository, protected EmailService $mail,
        protected SetupRepository $setup,
        protected CustomerGroupRepository $customerRepository,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/Users', [
            'businessTypes' => $this->lookupRepo->getBusinessTypes(),
            'countries' => $this->lookupRepo->getCountries(),
            'users' => $this->user->getAllUser($request->get('per_page', 10)),
            'employeeOptions' => EmployeeOptionsEnum::options(),
            'locationOptions' => LocationOptions::options(),
            'countryCodes' => $this->lookupRepo->getStdCode(),
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('Admin/UserDetail', [
            'user' => $this->user->getUserDetail($user),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/UserEdit', [
            'user' => $this->user->getUserDetail($user),
        ]);
    }

    public function update(UpdateUser $data, $user)
    {
        $this->service->update($data, $user);

        return to_route('admin.users.index')->with([
            'message' => 'New User Created SuccessFully',
            'type' => 'success',
        ]);
    }

    public function companyEdit(CompanyDetail $company)
    {

        return Inertia::render('Admin/CompanyEdit', [
            'company' => $this->user->getCompanyDetail($company),
            'countries' => $this->lookupRepo->getCountries(),
            'foodBusinessType' => $this->repository->getFoodBusinessType(),
        ]);
    }

    public function destroy(User $user)
    {
        $this->service->delete($user);

        return back();
    }

    public function companies(Request $request, user $user)
    {
        return Inertia::render('Admin/CompanyDetail', [
            'userId' => $user->id,
            'companies' => $this->user->getCompanySpecific($request->get('per_page', 10), $user),
        ]);
    }

    public function companyDetail(CompanyDetail $company)
    {
        return Inertia::render('Admin/Company/Detail', [
            'company' => $this->user->getCompanyDetailbyId($company),
            'foodBuisnessType' => $this->repository->getFoodBusinessType(),
            'mainCustomerGroup' => $this->customerRepository->getAllMainCustomer(),
            'folders' => $this->folders->getFolders($company),
            'addBuisnessActivity' => $this->repository->getAllBusinessActivity(),
        ]);
    }

    public function getCompanies(Request $request)
    {
        return Inertia::render('Admin/Company/ViewAll', [
            'dateFormat' => $this->setup->getDateFormat(),
            'user' => $this->user->getUsers(),
            'foodBusinessType' => $this->repository->getFoodBusinessType(),
            'countries' => $this->lookupRepo->getCountries(),
            'volumeUnit' => $this->setup->getVolumeUnit(),
            'weightUnits' => $this->setup->getWeightUnit(),
            'temperatureUnit' => $this->setup->getTemperatureUnit(),
            'monitoring' => $this->setup->getMonitoring(),
            'temperaturePrefill' => $this->setup->getTemperaturePrefill(),
            'companies' => $this->user->getAllCompanies($request->get('per_page', 10)),
        ]);
    }

    public function newUserStore(CreateCompanyUserData $data)
    {
        $this->service->creatNewUser($data);

        return back()->with([
            'message' => 'New User Created SuccessFully',
            'type' => 'success',
        ]);
    }
}
