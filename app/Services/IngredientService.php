<?php

namespace App\Services;

use App\Data\HaccpPlan\IngredientsData;
use App\Models\CompanyIngredients;

class IngredientService
{
    public function createOrUpdate(IngredientsData $data)
    {
        $validIngredientTypeIds = [];
        foreach ($data->ingredients as $ingredientId => $ingredientData) {
            foreach ($ingredientData as $ingredientTypeId => $fields) {
                $parsedIngredientId = (int) str_replace('ingredient_', '', $ingredientId);
                $parsedIngredientTypeId = (int) str_replace('ingredient_type_', '', $ingredientTypeId);
                CompanyIngredients::updateOrCreate(
                    [
                        'ingredient_id' => $parsedIngredientId,
                        'ingredient_type_id' => $parsedIngredientTypeId,
                        'company_id' => selectedCompany()->id ?? $data->companyId,
                    ],
                    [
                        'is_frozen' => $fields['is_frozen'] ?? false,
                        'is_chilled' => $fields['is_chilled'] ?? false,
                        'is_room_temperature' => $fields['is_room_temperature'] ?? false,
                        'is_allergen' => $fields['is_allergen'] ?? false,
                    ]
                );
                if (($fields['is_frozen'] ?? false) || ($fields['is_chilled'] ?? false) || ($fields['is_room_temperature'] ?? false)) {
                    $validIngredientTypeIds[$parsedIngredientTypeId][selectedCompany()->id ?? $data->companyId] = true;
                }
            }
        }

        $existingIngredients = CompanyIngredients::where('company_id', selectedCompany()->id ?? $data->companyId)
            ->get();

        foreach ($existingIngredients as $ingredient) {
            if (! isset($validIngredientTypeIds[$ingredient->ingredient_type_id][$ingredient->company_id])) {
                $ingredient->delete();
            }
        }

        return $existingIngredients;
    }
}
