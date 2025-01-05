<?php

namespace App\Services;

use App\Data\Traceability\PreparedProductArrayData;
use App\Data\Traceability\ProductRecipeData;
use App\Models\PreparationIngredient;
use App\Models\ProductPreparation;


class PreparedFoodService
{

    public function storeProductRecipe(PreparedProductArrayData $data)
    {

        $product = ProductPreparation::create($data->toArray());
        foreach ($data->ingredients as $ingredientGroup) {
            foreach ($ingredientGroup as $ingredient) {
                PreparationIngredient::create([
                    'product_preparation_id' => $product->id,
                    'add_ingredient_id' => $ingredient['ingredient_id'],
                    'batch_no' => $ingredient['batch'],
                    'expiry_date' => $ingredient['expiryDate'],
                    'amount' => $ingredient['amount'],
                    'unit' => $ingredient['unit'],
                ]);
            }
        }

        return $data;
    }


    public function updateProductRecipe(PreparedProductArrayData $data)
    {
        $productPreparation = ProductPreparation::find($data->id);
        $productPreparation->update([
            'company_id' => $data->companyId,
            'product_id' => $data->productId,
            'batch_code' => $data->batchCode,
            'amount' => $data->amount,
            'comment' => $data->comment,
            'expiry_date' => $data->expiryDate,
            'expiry_time' => $data->expiryTime,
        ]);
        foreach ($data->ingredients as $ingredientGroup) {
            foreach ($ingredientGroup['details'] as $ingredient) {
                PreparationIngredient::updateOrCreate(
                    [
                        'id' => $ingredient['id'],
                        'product_preparation_id' => $productPreparation->id,
                    ],
                    [
                        'add_ingredient_id' => $ingredient['add_ingredient_id'],
                        'batch_no' => $ingredient['batch_no'],
                        'amount' => $ingredient['amount'],
                        'expiry_date' => $ingredient['expiry_date'],
                        'unit' => $ingredient['unit'],
                    ]
                );
            }
        }

        return $data;
    }

}
