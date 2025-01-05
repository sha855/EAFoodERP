<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\IngredientsData;
use App\Http\Controllers\Controller;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\IngredientService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class IngredientController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected UserRepository $userRepository,
        protected IngredientService $service
    ) {}

    public function index()
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/Ingredients', [
            'companyId' => $this->userRepository->getCompany()->id,
            'ingredients' => $this->repository->getFoodIngredient($this->userRepository->getCompany()),
            'companyIngredient' => $this->repository->getCompanyIngredients($this->userRepository->getCompany()),
            'getIngredientsTypeCompany' => $this->repository->getIngredientsTypeCompany($this->userRepository->getCompany()),
            'translations' => Lang::get('HACCP/ingredients'),
            'isHaccp' => $isHaccp->is_haccp_completed,
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
