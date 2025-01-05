<?php

namespace App\Http\Controllers\HaccpPlan;

use App\Data\HaccpPlan\WorkGroupArrayData;
use App\Data\HaccpPlan\WorkGroupData;
use App\Enums\WorkGroupEnum;
use App\Http\Controllers\Controller;
use App\Repositories\HaccpRepository;
use App\Repositories\UserRepository;
use App\Services\WorkGroupService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class WorkGroupController extends Controller
{
    public function __construct(protected WorkGroupService $service,
        protected HaccpRepository $repository, protected UserRepository $userRepository) {}

    public function index()
    {
        $isHaccp = $this->userRepository->companyHaccpStatus();

        return Inertia::render('Haccp/WorkGroup', [
            'companyWorkGroup' => $this->repository->getCompanyTask($this->userRepository->getCompany()),
            'customWorkGroup' => $this->repository->getCustomWorkGroup($this->userRepository->getCompany()),
            'workGroup' => WorkGroupEnum::labels(),
            'translations' => Lang::get('HACCP/WorkGroup'),
            'workGroupUser' => $this->repository->getWorkGroupUsers(),
            'company' => $this->repository->getCompanyWithUSer($this->userRepository->getCompany()),
            'isHaccp' => $isHaccp->is_haccp_completed,
            'users' => $this->userRepository->getUsers(),
        ]);
    }

    public function store(WorkGroupArrayData $data)
    {
        $this->service->create($data);

        return back()->with([
            'message' => 'Work Group Updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(WorkGroupData $data)
    {
        $this->service->delete($data);

        return back()->with([
            'message' => 'Work Group task deleted Successfully',
            'type' => 'success',
        ]);

    }
}
