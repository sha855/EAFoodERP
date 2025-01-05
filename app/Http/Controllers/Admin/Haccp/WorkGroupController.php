<?php

namespace App\Http\Controllers\Admin\Haccp;

use App\Data\HaccpPlan\WorkGroupArrayData;
use App\Data\HaccpPlan\WorkGroupData;
use App\Data\HaccpPlan\WorkGroupResponsibleData;
use App\Enums\WorkGroupEnum;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\HaccpRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\UserRepository;
use App\Services\WorkGroupService;
use Illuminate\Support\Facades\Lang;
use Inertia\Inertia;

class WorkGroupController extends Controller
{
    public function __construct(
        protected HaccpRepository $repository,
        protected WorkGroupService $service,
        protected UserRepository $user,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(CompanyDetail $company)
    {
        return Inertia::render('Admin/Haccp/WorkGroup', [
            'tasks' => $this->repository->getworkGroupTask(),
            'companyWorkGroup' => $this->repository->getCompanyTask($company),
            'customWorkGroup' => $this->repository->getCustomWorkGroup($company),
            'translations' => Lang::get('HACCP/WorkGroup'),
            'workGroup' => WorkGroupEnum::labels(),
            'workGroupUser' => $this->repository->getWorkGroupUsers(),
            'users' => $this->user->getUsers(),
            'company' => $this->repository->getCompanyWithUSer($company),
            'folders' => $this->folders->getFolders($company),
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

    public function syncResponsibleUsers(WorkGroupResponsibleData $data)
    {
        $this->service->responsibleUserSync($data);

        return back()->with([
            'message' => 'work group responsible user updated successfully',
            'type' => 'success',
        ]);

    }
}
