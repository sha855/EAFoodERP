<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\IngredientsData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\IngredientService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class IngredientController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected IngredientService $service,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/Ingredients', [
            'companyId' => $company->id,
            'ingredients' => $this->repository->getFoodIngredient($company),
            'companyIngredient' => $this->repository->getCompanyIngredients($company),
            'getIngredientsTypeCompany' => $this->repository->getIngredientsTypeCompany($company),
            'translations' => Lang::get('HACCP/ingredients'),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function store(IngredientsData $data)
    {
        $ingredient = $this->service->createOrUpdate($data);

        if ($ingredient) {
            return back()->with([
                'message' => 'Food Ingredient Updated Successfully',
                'type' => 'success',
            ]);
        }
    }
}
