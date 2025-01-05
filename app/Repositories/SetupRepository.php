<?php

namespace App\Repositories;

use App\Enums\DateFormatEnum;
use App\Enums\EmployeeOptionsEnum;
use App\Enums\LanguagesEnum;
use App\Enums\MonitoringEnum;
use App\Enums\TemperaturePrefillEnum;
use App\Enums\TemperatureUnitEnum;
use App\Enums\TypeOfLocationEnum;
use App\Enums\VolumeUnitEnum;
use App\Enums\WeightUnitsEnum;
use App\Models\CompanyDetail;

class SetupRepository
{
    public function getUserCompany(?CompanyDetail $company)
    {
        return selectedCompany() ?? $company ;
    }

    public function getEmployeeOption(string $employeeOption = EmployeeOptionsEnum::class): array
    {
        $result = [];
        foreach ($employeeOption::cases() as $case) {
            $result[] = [
                'label' => $case->value,
                'value' => $case->value,
            ];
        }

        return $result;
    }

    /**
     * Generic method to process enum cases into a label-value array.
     */
    private function processEnumCases(string $enumClass): array
    {
        $result = [];
        foreach ($enumClass::cases() as $case) {
            $result[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $result;
    }

    public function getLanguages(): array
    {
        return $this->processEnumCases(LanguagesEnum::class);
    }

    public function getDateFormat(): array
    {
        return $this->processEnumCases(DateFormatEnum::class);
    }

    public function getVolumeUnit(): array
    {
        return $this->processEnumCases(VolumeUnitEnum::class);
    }

    public function getWeightUnit(): array
    {
        return $this->processEnumCases(WeightUnitsEnum::class);
    }

    public function getTemperatureUnit(): array
    {
        return $this->processEnumCases(TemperatureUnitEnum::class);
    }

    public function getMonitoring(): array
    {
        return $this->processEnumCases(MonitoringEnum::class);
    }

    public function getTemperaturePrefill(): array
    {
        return $this->processEnumCases(TemperaturePrefillEnum::class);
    }

    public function getTypeOfLocation(): array
    {
        return $this->processEnumCases(TypeOfLocationEnum::class);
    }

    public function getLanguage(): array
    {
        return $this->processEnumCases(LanguagesEnum::class);
    }
}
