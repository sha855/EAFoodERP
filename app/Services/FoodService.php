<?php

namespace App\Services;

use App\Data\FoodBuisness\BusinessActivityArrayData;
use App\Data\FoodBuisness\BusinessActivityData;
use App\Data\FoodBuisness\FoodBusinessTypeArrayData;
use App\Data\FoodBuisness\FoodBusinessTypeData;
use App\Models\AdditionalBusinessActivity;
use App\Models\FoodBusinessType;
use App\Models\FoodBusinessUnit;

class FoodService
{
    public function create(FoodBusinessTypeArrayData $data)
    {
        foreach ($data->foodBusinessTypes as $type) {
            FoodBusinessType::create($type->toArray());
        }

        return $data;
    }

    public function update(FoodBusinessTypeData $data, FoodBusinessType $food)
    {
        return $food->update($data->toarray());
    }

    public function updateBusinessActivity(BusinessActivityData $data, AdditionalBusinessActivity $business_activity)
    {
        return $business_activity->update($data->toarray());
    }

    public function updateBusinessUnit(BusinessActivityData $data, FoodBusinessUnit $business_unit)
    {
        return $business_unit->update($data->toarray());
    }

    public function createBusinessActivity(BusinessActivityArrayData $data)
    {
        foreach ($data->types as $type) {
            AdditionalBusinessActivity::create($type->toArray());
        }

        return $data;
    }

    public function createBusinessUnit(BusinessActivityArrayData $data)
    {
        foreach ($data->types as $type) {
            FoodBusinessUnit::create($type->toArray());
        }

        return $data;
    }

    public function foodTypeDelete(FoodBusinessType $food)
    {
        return $food->delete();
    }

    public function foodUnitdelete(FoodBusinessUnit $business_unit)
    {
        return $business_unit->delete();
    }

    public function businessActivityDelete(AdditionalBusinessActivity $business_activity)
    {

        return $business_activity->delete();

    }
}
