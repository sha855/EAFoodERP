<?php

namespace App\Repositories;

use App\Enums\AddIngredientEnum;
use App\Enums\FirstUnitEnum;
use App\Enums\ProductExpirationDataEnum;
use App\Enums\SecondUnitEnum;
use App\Enums\TraceAllergensEnum;
use App\Models\CompanyDetail;
use App\Models\CustomProductIngredient;
use App\Models\MeasuringUnit;
use App\Models\ProductIngredient;
use App\Models\ProductRecipe;
use App\Models\TraceProductInfo;

class TraceabilityRepository
{

    public function getProductrecipes()
    {
       return ProductRecipe::where('product_type', 'our_recipe')->with('TraceProductInfo', 'TraceProductInfo.ingredients', 'consumerInfo')->get();
    }


    public function recipesIngredient(int $perPage, CompanyDetail $company)
    {

      return ProductRecipe::where('company_id', $company->id)->orderByDesc('id')->paginate($perPage);
    }

    public function getRecipesIngredientById(?ProductRecipe $productRecipe)
    {
        if (!$productRecipe) {
            return null;
        }

       return ProductRecipe::with('consumerInfo', 'consumerInfo.allergenInfos', 'images')->find($productRecipe->id);
    }


    public function getTraceabilityProductInfo(ProductRecipe $productRecipe)
    {
       return TraceProductInfo::with('productRecipes', 'ingredients')
        ->where('product_recipes_id', $productRecipe->id)->first();
    }

    public function getCustomUnit()
    {
        return MeasuringUnit::all();
    }

    public function getProductIngredient()
    {

      $customProductIngredients = CustomProductIngredient::where('company_id', selectedCompany()->id)
        ->get(['id', 'name', 'created_at', 'updated_at']);
      $productIngredients = ProductIngredient::get(['id', 'name', 'created_at', 'updated_at']);
      $combinedIngredients = $customProductIngredients->concat($productIngredients);
      $sortedIngredients = $combinedIngredients->sortBy('name')->values();
      return $sortedIngredients;
    }


    public function getProductExpirationDateEnum()
    {
        $productExpirationDateEnum = [];
        foreach (ProductExpirationDataEnum::cases() as $case) {
            $productExpirationDateEnum[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $productExpirationDateEnum;
    }

    public function getTraceAllergensEnum()
    {
        $traceAllergensEnum = [];
        foreach (TraceAllergensEnum::cases() as $case) {
            $traceAllergensEnum[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $traceAllergensEnum;
    }

    public function getAddIngredientEnum()
    {
        $ingredientEnum = [];
        foreach (AddIngredientEnum::cases() as $case) {
            $ingredientEnum[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $ingredientEnum;
    }

    public function getFirstUnitEnum()
    {
        $firstUnitEnum = [];
        foreach (FirstUnitEnum::cases() as $case) {
            $firstUnitEnum[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $firstUnitEnum;
    }

    public function getSecondtUnitEnum()
    {
        $secondUnitEnum = [];
        foreach (SecondUnitEnum::cases() as $case) {
            $secondUnitEnum[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $secondUnitEnum;
    }
}
