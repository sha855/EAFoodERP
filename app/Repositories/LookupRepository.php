<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\FoodBusinessType;
use App\Models\StdCode;
use CountryState;
use Illuminate\Support\Facades\Auth;

class LookupRepository
{
    public function getBusinessTypes()
    {
        return FoodBusinessType::all(['id', 'name', 'description'])->toArray();
    }

    public function getCountries()
    {
        return CountryState::getCountries();
    }

    public function getStates($code)
    {
        return CountryState::getStates($code);
    }

    public function getCompanyById(int $id): ?CompanyDetail
    {
        return CompanyDetail::where('user_id', $id)->first();
    }

    public function getStdCode()
    {

        $selectedCountry = Auth::user()->companyDetail()->first();
        $selectedCountryCode = strtoupper($selectedCountry?->country_name);
        $stdCodes = StdCode::all(['id', 'country', 'stdcode']);

        $sortedStdCodes = $stdCodes->sortByDesc(function ($item) {
            return $item->country === 'TR' ? 1 : 0;
        })->values();


        return $sortedStdCodes;
    }
}
