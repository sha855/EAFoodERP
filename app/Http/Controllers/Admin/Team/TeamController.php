<?php

namespace App\Http\Controllers\Admin\Team;

use App\Data\Team\TeamCertificateAndTrainingData;
use App\Data\Team\TeamData;
use App\Data\Team\TeamRoleData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Repositories\ManageFolderRepository;
use App\Repositories\TeamRepository;
use App\Services\TeamService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function __construct(
        protected TeamService $service,
        protected TeamRepository $repository,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(CompanyDetail $company, Request $request)
    {
        return Inertia::render('Admin/Team/Index', [
            'teams' => $this->repository->getTeams($company, $request->get('per_page', 10)),
            'roles' => $this->repository->geTeamRoles($company),
            'companyId' => $company->id,
            'certificatesAndTrainings' => $this->repository->getCertificatesAndTrainings($company),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function store(TeamData $data)
    {
        $this->service->create($data);

        return back()->with([
            'message' => __('Team/Messages.team.created'),
            'type' => 'success',
        ]);
    }

    public function roles(CompanyDetail $company, Request $request)
    {
        $roles = $this->repository->geTeamRoles(
            $company,
            $request->get('per_page', 10)
        );

        return Inertia::render('Admin/Team/FeaturedRole', [
            'companyId' => $company->id,
            'roles' => $roles,
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function roleStore(TeamRoleData $data)
    {
        $this->service->createTeamRole($data);

        return back()->with([
            'message' => __('Team/Messages.role.created'),
            'type' => 'success',
        ]);
    }

    public function updateRole($id, TeamRoleData $data)
    {
        $this->service->updateTeamRole($id, $data);

        return back()->with([
            'message' => __('Team/Messages.role.updated'),
            'type' => 'success',
        ]);
    }

    public function roleDestroy($id)
    {
        $this->service->roleDelete($id);

        return back()->with([
            'message' => __('Team/Messages.role.deleted'),
            'type' => 'success',
        ]);
    }

    public function certificatesAndTrainings(CompanyDetail $company, Request $request)
    {
        return Inertia::render('Admin/Team/CertificatesAndTrainings', [
            'companyId' => $company->id,
            'frequencies' => $this->repository->getCertificateAndTrainingFrequencies(),
            'certificatesAndTrainings' => $this->repository->getCertificatesAndTrainings($company, $request->get('per_page', 10)),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function storeTeamCertificateAndTraining(TeamCertificateAndTrainingData $data)
    {
        $this->service->createTeamCertificateAndTraining($data);

        return back()->with([
            'message' => __('Team/Messages.certificate.created'),
            'type' => 'success',
        ]);
    }

    public function getTeam($id)
    {
        $data = $this->repository->getTeam($id);
        if ($data) {
            return response()->json($data);
        } else {
            return response()->json(['error' => __('Team/Messages.team.notFound')], 404);
        }
    }

    public function getTeamCertificateAndTraining($id)
    {
        $data = $this->repository->getTeamCertificateAndTraining($id);
        if ($data) {
            return response()->json($data);
        } else {
            return response()->json(['error' => __('Team/Messages.team.notFound')], 404);
        }
    }

    public function edit($id, TeamData $data)
    {
        $this->service->update($id, $data);

        return back()->with([
            'message' => __('Team/Messages.team.updated'),
            'type' => 'success',
        ]);
    }

    public function trainingEdit($id, TeamCertificateAndTrainingData $data)
    {
        $this->service->trainingUpdate($id, $data);

        return back()->with([
            'message' => __('Team/Messages.training.updated'),
            'type' => 'success',
        ]);
    }

    public function destroy($id)
    {
        $this->service->delete($id);
    }
}
