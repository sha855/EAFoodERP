<?php

namespace App\Http\Controllers\Setup;

use App\Data\ApiAccessToken\ApiAccessTokenData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\ApiAccessTokenRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\UserRepository;
use App\Services\ApiAccessTokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ApiAccessTokenController extends Controller
{
    public function __construct(
        protected ApiAccessTokenService $service,
        protected ApiAccessTokenRepository $repository,
        protected UserRepository $userRepository,
        protected ManageFolderRepository $folders
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('ApiAccessToken/Index', [
            'apiAccessTokens' => $this->repository->getAll($this->userRepository->getCompany(), $request->get('per_page', 10)),
            'companyId' => selectedCompany()->id,
        ]);
    }

    public function show(Request $request, CompanyDetail $company)
    {
        return Inertia::render('Admin/Setup/ApiAccessToken/Index', [
            'apiAccessTokens' => $this->repository->getAll($company, $request->get('per_page', 10)),
            'companyId' => $company->id,
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function store(ApiAccessTokenData $data, CompanyDetail $company)
    {
        $this->service->create($data->toArray());

        return back()->with([
            'message' => __('ApiAccessToken/Messages.token.created'),
            'type' => 'success',
        ]);
    }

    public function adminStore(ApiAccessTokenData $data, CompanyDetail $company)
    {
        $data->companyId = $company->id;
        $this->service->create($data->toArray());

        return back()->with([
            'message' => __('ApiAccessToken/Messages.token.created'),
            'type' => 'success',
        ]);
    }

    public function destroy($id)
    {
        $this->service->delete($id);

        return back()->with([
            'message' => __('ApiAccessToken/Messages.token.deleted'),
            'type' => 'success',
        ]);
    }
}
