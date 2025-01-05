<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\ProductPreparation;

class PreparedProductRepository
{
    public function getProductPreparation(CompanyDetail $company, int $perPage = 10)
    {
        return ProductPreparation::with('productRecipe', 'companyDetails', 'preparationIngredients.addIngredient' )->where('company_id', $company->id)->orderBy('id', 'desc')->paginate($perPage);
    }


}
