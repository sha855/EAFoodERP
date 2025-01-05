<?php

namespace App\Services;

use App\Data\Traceability\ConsumerInfoData;
use App\Data\Traceability\CustomMeasuringUnitData;
use App\Data\Traceability\CustomProductIngredData;
use App\Data\Traceability\ProductInfoData;
use App\Data\Traceability\ProductRecipeData;
use App\Models\AddIngredients;
use App\Models\ConsumerInfo;
use App\Models\CustomProductIngredient;
use App\Models\CustomProductIngredientAllergen;
use App\Models\MeasuringUnit;
use App\Models\ProductIngredient;
use App\Models\ProductRecipe;
use App\Models\ProductRecipesImage;
use App\Models\TraceProductInfo;
use App\Repositories\TraceabilityRepository;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;

class TraceabilityService
{
    public function __construct(protected TraceabilityRepository $repository) {}

    public function storeProductRecipe(ProductRecipeData $data)
    {
        $productRecipe = ProductRecipe::updateOrCreate(
            [
             'id' => $data->id,
             'upc_code' => $data->upcCode,
             'product_code' => $data->productCode,
            ],
            $data->toArray()
        );
        foreach ($data->files as $fileData) {
            if (isset($fileData['file']) && $fileData['file'] instanceof UploadedFile) {
                $filePath = $fileData['file']->store('product_recipes', 'public');
                ProductRecipesImage::create([
                    'product_recipes_id' => $productRecipe->id,
                    'image_name' => $fileData['file']->getClientOriginalName(),
                    'image_path' => $filePath,
                ]);
            }
        }

        return $productRecipe;
    }

    public function storeProductInfo(ProductInfoData $data)
    {
            $traceProductInfo = TraceProductInfo::updateOrcreate([
            'id' => $data->id,
            'product_recipes_id' => $data->productRecipeId,
            ],
            [
                'recipe_total_amount' => $data->recipeTotalAmount,
                'recipe_total_amount_unit' => $data->recipeTotalAmountUnit,
                'one_portion_amount' => $data->onePortionAmount,
                'one_portion_amount_unit' => $data->onePortionAmountUnit,
                'preparation_instructionst' => $data->preparationInstructionst,
                'product_recipes_id' => $data->productRecipeId,
            ]);
         $traceProductInfoId = $traceProductInfo->id;
         if (! empty($data->ingredients)) {
            foreach ($data->ingredients as $ingredient) {

                $product = ProductIngredient::where('name', $ingredient['ingredient'])->first();
                AddIngredients::updateOrCreate(
                    [
                        'id' => $ingredient['id'] ?? 0,
                        'trace_product_info_id' => $traceProductInfoId,
                    ],
                    [
                        'trace_product_info_id' => $traceProductInfoId,
                        'ingredient' => $ingredient['ingredient'],
                        'amount' => $ingredient['amount'],
                        'unit' => $ingredient['ingredient_units'] ?? $ingredient['unit'],
                    ]
                );

                if (!$product) {
                    $customIngred = CustomProductIngredient::create([
                        'name' => $ingredient['ingredient'],
                        'company_id' => $data->companyId,
                    ]);

                    foreach ($ingredient['allergens'] as $allergen) {
                        CustomProductIngredientAllergen::create([
                            'custom_product_ingredient_id' => $customIngred->id,
                            'allergen' => $allergen,
                        ]);
                    }
                }
            }
        }

        return $traceProductInfo;
    }

    public function storeConsumerInfo(ConsumerInfoData $data)
    {
        $productRecipe = ProductRecipe::find($data->productRecipeId);

        if (!$productRecipe) {
            return redirect()->back()->withErrors([
                'product_recipe' => 'The product recipe ID does not exist.',
            ]);
        }
        $consumerInfo = ConsumerInfo::updateOrCreate(
            [
                'id' => $data->id,
                'product_recipes_id' => $data->productRecipeId,
            ],
               $data->toArray()
        );

        if (! empty($data->allergen)) {
            $this->updateAllergenInfos($consumerInfo, $data->allergen);
        }

        return $consumerInfo;
    }

    private function updateAllergenInfos(ConsumerInfo $consumerInfo, array $allergens): void
    {
        $consumerInfo->allergenInfos()
            ->whereNotIn('key', $allergens)
            ->delete();

        foreach ($allergens as $allergenKey) {
            if($allergenKey)
            {
                $consumerInfo->allergenInfos()->updateOrCreate(
                    ['key' => $allergenKey],
                    ['value' => 1]
                );
            }
        }
    }

    public function storeCustomMeasuringUnits(CustomMeasuringUnitData $data)
    {
        $dataArray = $data->toArray();
        $units = array_slice($dataArray['units'], 2);
        MeasuringUnit::where('user_id', Auth::id())->delete();
        foreach ($units as $unit) {
            MeasuringUnit::create([
                'name' => $unit['name'],
                'symbol' => $unit['symbol'],
                'value' => $unit['value'],
                'user_id' => Auth::id(),
            ]);
        }

        return response()->json(['message' => 'Custom measuring units saved successfully.']);
    }

    public function deleteRecipes(ProductRecipesImage $recipe_image)
    {
        return $recipe_image->delete();
    }
}
