<?php

namespace App\Repositories;

use App\Enums\EmployeeOptions;
use App\Enums\EmployeeOptionsEnum;
use App\Models\BusinessUnit;
use App\Models\CompanyDetail;
use App\Models\FoodBusinessType;

class BusinessUnitRepository
{
    public function create(array $data): BusinessUnit
    {
        return BusinessUnit::create($data);
    }

    public function getCompanyById($id): ?CompanyDetail
    {
        return CompanyDetail::find($id);
    }

    public function getCompanyId()
    {
        return selectedCompany()->id;
    }

    public function getBusinessDetail(): array
    {
        return [
            'employeeOptions' => EmployeeOptionsEnum::options(),
            'foodBusinessType' => FoodBusinessType::all(),
        ];
    }
}
