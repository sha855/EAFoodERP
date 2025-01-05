<?php

namespace App\Http\Controllers\Traceability;

use App\Data\Traceability\ConsumerInfoData;
use App\Data\Traceability\ProductInfoData;
use App\Data\Traceability\ProductRecipeData;
use App\Enums\TraceAllergensEnum;
use App\Http\Controllers\Controller;
use App\Models\ProductRecipe;
use App\Models\ProductRecipesImage;
use App\Repositories\TraceabilityRepository;
use App\Repositories\UserRepository;
use App\Services\TraceabilityService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RecipeIngredController extends Controller
{
    public function __construct(protected TraceabilityService $traceabilityService,
        protected TraceabilityRepository $traceabilityRepository,
        protected UserRepository $userRepository, ) {}

    public function recipesIngredients(Request $request)
    {
        return Inertia::render('TraceAbility/RecipesIngredients', [
            'recipes' => $this->traceabilityRepository->recipesIngredient($request->get('per_page', 10), $this->userRepository->getCompany()),
        ]);
    }

    public function showProductRecipe(ProductRecipe $id)
    {
        return inertia('TraceAbility/ProductRecipeDetails', [
            'id' => $id,
            'recipe' => $this->traceabilityRepository->getRecipesIngredientById($id),
        ]);
    }

    public function productRecipe(Request $request)
    {
        return Inertia::render('TraceAbility/ProductRecipe', [
            'productExpirationDateEnum' => $this->traceabilityRepository->getProductExpirationDateEnum(),
            'productRecipe' => $this->traceabilityRepository->getRecipesIngredientById(ProductRecipe::find($request->id)),
            'companyId' => $this->userRepository->getCompany()->id,
        ]);
    }

    public function productRecipeStore(ProductRecipeData $data)
    {
        $productRecipe = $this->traceabilityService->storeProductRecipe($data);
        if ($data->productType == 'purchased') {
            return to_route('consumer-info', ['product_recipe_id' => $productRecipe->id])->with([
                'message' => 'Product recipe stored successfully!',
                'type' => 'success',
            ]);
        } else {
            return to_route('product-info', ['product_recipe_id' => $productRecipe->id])->with([
                'message' => 'Product recipe stored successfully!',
                'type' => 'success',
            ]);
        }
    }

    public function productInfo(ProductRecipe $product_recipe_id)
    {
        return Inertia::render('TraceAbility/ProductInfo', [
            'product_recipe_id' => $product_recipe_id,
            'productRecipe' => $this->traceabilityRepository->getRecipesIngredientById($product_recipe_id),
            'productInfo' => $this->traceabilityRepository->getTraceabilityProductInfo($product_recipe_id),
            'ingredients' => $this->traceabilityRepository->getProductIngredient(),
            'customUnit' => $this->traceabilityRepository->getCustomUnit(),
            'traceAllergens' => TraceAllergensEnum::label(),
            'companyId' => $this->userRepository->getCompany()->id,
        ]);
    }

    public function storeProductInfo(ProductInfoData $data)
    {
        $data = ProductInfoData::from($data);
        $this->traceabilityService->storeProductInfo($data);

        return to_route('consumer-info', ['product_recipe_id' => $data->productRecipeId])->with([
            'message' => 'Product Info added successfully',
            'type' => 'success',
        ]);
    }

    public function consumerInfo(ProductRecipe $product_recipe_id)
    {

        return Inertia::render('TraceAbility/ConsumerInfo', [
            'product_recipe_id' => $product_recipe_id->id,
            'productRecipe' => $this->traceabilityRepository->getRecipesIngredientById($product_recipe_id),
            'traceAllergens' => TraceAllergensEnum::label(),
            'companyId' => $this->userRepository->getCompany()->id,
        ]);
    }

    public function storeConsumerInfo(ConsumerInfoData $data)
    {
        $this->traceabilityService->storeConsumerInfo($data);

        return to_route('recipes-ingredients')->with([
            'message' => 'Consumer info stored successfully!',
            'type' => 'success',
        ]);
    }

    public function deleteRecipes(ProductRecipesImage $recipe_image)
    {
        $this->traceabilityService->deleteRecipes($recipe_image);

        return back()->with([
            'message' => 'Recipes images deleted',
            'type' => 'success',
        ]);
    }
}
