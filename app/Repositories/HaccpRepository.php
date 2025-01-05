<?php

namespace App\Repositories;

use App\Data\HaccpPlan\ProducedFoodData;
use App\Models\AdditionalBusinessActivity;
use App\Models\AnalysesTask;
use App\Models\BusinessUnitFoodProduct;
use App\Models\CompanyActiveProcess;
use App\Models\CompanyDetail;
use App\Models\CompanyFoodProduct;
use App\Models\CompanyIngredients;
use App\Models\CustomAnalysesTask;
use App\Models\CustomProcess;
use App\Models\CustomWorkGroup;
use App\Models\FloorPlan;
use App\Models\FlowChart;
use App\Models\FoodBusinessType;
use App\Models\FoodBusinessUnit;
use App\Models\FoodHazard;
use App\Models\Ingredient;
use App\Models\LocationPlan;
use App\Models\Process;
use App\Models\ProductionVolume;
use App\Models\WorkGroup;
use App\Models\WorkGroupUser;

class HaccpRepository
{
    public function getFoodBusinessType()
    {
        return FoodBusinessType::with('units')
            ->orderBy('id', 'desc')->
             get();
    }

    public function getFoodBusinessActivity(int $perPage = 10)
    {
        return AdditionalBusinessActivity::orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getAllBusinessActivity()
    {
        return AdditionalBusinessActivity::orderBy('id', 'desc')
            ->get();
    }

    public function getFoodBusinessUnit(int $perPage = 10)
    {
        return FoodBusinessUnit::with('businessType')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getFoodBusiness(int $perPage = 10)
    {
        return FoodBusinessType::with('units')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getFoodBusinessById(FoodBusinessType $food)
    {
        return FoodBusinessType::where('id', $food->id)
            ->with('additionalActivities', 'units')
            ->orderBy('id', 'desc')
            ->get();
    }

    public function getworkGroupTask()
    {
        return WorkGroup::All();

    }

    public function getCompanyTask(CompanyDetail $company)
    {
        return WorkGroup::with('responsibleUser')->where('company_id', $company->id)
            ->get();
    }

    public function getCustomWorkGroup(CompanyDetail $company)
    {
        return CustomWorkGroup::where('company_id', $company->id)
            ->get();
    }

    public function getProcessStep(CompanyDetail $company)
    {
       return Process::where('company_id', $company->id)->where('is_active', true)
        ->orderBy('order')
        ->get();
    }

    public function getInActiveProcessStep(CompanyDetail $company)
    {
       return Process::where('company_id', $company->id)->where('is_active', false)
        ->orderBy('order')
        ->get();
    }

    public function producedFood()
    {
        return BusinessUnitFoodProduct::get();
    }

    public function getCompanyFoodProduct(CompanyDetail $company)
    {
        return CompanyFoodProduct::where('company_id', $company->id)->get();
    }

    public function existingCompanyFood(ProducedFoodData $food)
    {
        return CompanyFoodProduct::where('company_id', $food->companyId)
            ->where('food_product_id', $food->foodProductId)
            ->first();
    }

    public function getProductionVolume(CompanyDetail $company)
    {
        return BusinessUnitFoodProduct::with('productionVolume')->whereHas('companyFoodProduct', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->get();
    }


    public function getOtherProductionVolume(CompanyDetail $company)
    {
        return BusinessUnitFoodProduct::with('OtherProductionVolume')->whereHas('companyFoodProduct', function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->get();
    }



    public function getCompanyProduction(CompanyDetail $company)
    {
        return ProductionVolume::where('company_id', $company->id)->get();
    }

    public function getFoodIngredient(CompanyDetail $company)
    {
        return Ingredient::with('ingredientTypes')->get();
    }

    public function getCompanyIngredients(CompanyDetail $company)
    {
        return CompanyIngredients::where('company_id', $company->id)
            ->with('ingredientType', 'ingredient', 'company')->get();
    }

    public function getIngredientsTypeCompany(CompanyDetail $company)
    {
        return Ingredient::with(['companyIngredients.ingredientType', 'companyIngredients' => function ($query) use ($company) {
            $query->where('company_id', $company->id);
        }])->get();
    }

    public function getAnalysesDetail(CompanyDetail $company)
    {
        return AnalysesTask::with(['taskDetail' => function ($query) use ($company) {
            $query->where('company_id', $company->id);
        }])->get();

    }

    public function getCustomAnalysesTask(CompanyDetail $company)
    {
        return CustomAnalysesTask::where('company_id', $company->id)->get();
    }

    public function getCompanyWithUSer(CompanyDetail $company)
    {
        return $company->load(['user']);
    }

    public function getCustomProcess(CompanyDetail $company)
    {
        return CustomProcess::where('company_id', $company->id)->get();
    }

    public function getFoodHazard(CompanyDetail $company)
    {
        return FoodHazard::with('monitoringHazards', 'auditHazards')->where('company_id', $company->id)->get();
    }

    public function CompanyActiveProcess(CompanyDetail $company)
    {
        return Process::where('company_id', $company->id)->where('is_active', 1)->get();
    }

    public function AnotherCompanyServing(CompanyDetail $company)
    {
        return Process::where('company_id', $company->id)->where('name', 'Sale/serving of food to another company')
            ->orWhere('id', 33)
            ->with('process')
            ->first();
    }

    public function getflowChart(CompanyDetail $company)
    {
        return FlowChart::where('company_id', $company->id)->get();
    }

    public function getSpecificflowChart(int $perPage, CompanyDetail $company)
    {
        return FlowChart::where('company_id', $company->id)->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getLocationPlan(CompanyDetail $company)
    {
        return LocationPlan::where('company_id', $company->id)->get();
    }

    public function getSpecificLocationPlan(int $perPage, CompanyDetail $company)
    {
        return LocationPlan::where('company_id', $company->id)->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getFloorPlan(CompanyDetail $company)
    {
        return FloorPlan::with('files')->where('company_id', $company->id)->get();
    }

    public function getWorkGroupUsers()
    {
        return WorkGroupUser::with('user:id,name')->get();
    }
}
