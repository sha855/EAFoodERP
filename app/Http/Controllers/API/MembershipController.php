<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Repositories\PackageRepository;
use App\Services\CompanyService;

class MembershipController extends Controller
{
    public function __construct(protected PackageRepository $repository,
        protected CompanyService $service) {}

    public function index()
    {
        $data = $this->repository->getPackageData();

        return response()->json(['package' => $data, 'message' => 'Package Data Fetched!'], 201);
    }

    public function plansFeature()
    {
        return response()->json(['plansData' => $this->repository->getPlanComparison(), 'message' => 'Plans & feature Fetched Successfully'], 201);
    }
}
