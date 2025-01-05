<?php

namespace App\Repositories;

use App\Enums\CertificateAndTrainingFrequencyEnum;
use App\Models\CertificateAndTraining;
use App\Models\CompanyDetail;
use App\Models\FeaturedRole;
use App\Models\Team;

class TeamRepository
{
    public function getCertificateAndTrainingFrequencies()
    {
        $certificateAndTrainings = [];
        foreach (CertificateAndTrainingFrequencyEnum::cases() as $case) {
            $certificateAndTrainings[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $certificateAndTrainings;
    }

    public function getTeam($id)
    {
        $team = Team::where('id', $id)->with('roles', 'certificatesAndTrainings')->first();
        $roleIds = $team->roles->pluck('featured_role_id')->toArray();
        $featuredRoles = FeaturedRole::whereIn('id', $roleIds)->pluck('id')->toArray();
        $teamArray = $team->toArray();
        $teamArray['roles'] = $featuredRoles;

        return [$teamArray];
    }

    public function getTeamCertificateAndTraining($id)
    {
        return CertificateAndTraining::where('id', $id)->first()->toArray();
    }

    public function getTeams(CompanyDetail $company, int $perPage = 10)
    {
        return Team::where('company_id', $company->id)->with(['user', 'certificatesAndTrainings'])->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function geTeamRoles(?CompanyDetail $companyDetail = null, int $perPage = 10, ?string $search = null)
    {
        $selectedCompany = $companyDetail?->id ?? selectedCompany()?->id;
        $roles = FeaturedRole::with('teamsFeaturedRoles')->where('company_id', $selectedCompany)
            ->orderBy('id', 'desc')
            ->paginate($perPage);
        $data = $roles->toArray();
        $data['data'] = array_map(function ($role) {
            $role['used'] = 'Used for '.count($role['teams_featured_roles']).' team members';

            return $role;
        }, $data['data']);

        return $data;
    }

    public function getCertificatesAndTrainings(CompanyDetail $company, int $perPage = 10)
    {
        return CertificateAndTraining::where('company_id', $company->id)->whereNull('deleted_at')->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getFeaturedRole(?CompanyDetail $company = null)
    {
        return FeaturedRole::when($company, function ($query) use ($company) {
            $query->where('company_id', $company->id);
        })->orderByDesc('id')->get();
    }

    public function getTeamsMemberStatus(): bool
    {
        return Team::where('user_id', auth()->id())->exists();
    }
}
