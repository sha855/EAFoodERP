<?php

namespace App\Services;

use App\Data\Team\TeamCertificateAndTrainingData;
use App\Data\Team\TeamData;
use App\Data\Team\TeamRoleData;
use App\Models\CertificateAndTraining;
use App\Models\CompanyDetail;
use App\Models\FeaturedRole;
use App\Models\Team;
use App\Models\TeamCertificatesAndTraining;
use App\Models\TeamsFeaturedRole;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TeamService
{
    public function create(TeamData $data): Team
    {
        $teamData = $data->toArray();
        $companyDetail = CompanyDetail::where('id', selectedCompany()->id ?? $data->companyId)->first();
        $teamData['user_id'] = $companyDetail->user_id;
        $teamData['company_id'] = $companyDetail->id;
        $teamRoles = $teamData['team_roles'] ?? '';
        $teamCertificates = $teamData['team_certificates'] ?? '';
        unset($teamData['team_roles'], $teamData['team_certificates']);
        $team = Team::create($teamData);
        if ($team->id) {
            $teamRolesData = [];
            if ($teamRoles) {
                foreach ($teamRoles as $key => $teamRoleId) {
                    $teamRolesData[$key]['team_member_id'] = $team->id;
                    $teamRolesData[$key]['featured_role_id'] = $teamRoleId;
                }
                foreach ($teamRolesData as $role) {
                    TeamsFeaturedRole::create($role);
                }
            }

            $teamCertificatesData = [];
            if ($teamCertificates) {
                foreach ($teamCertificates as $certificate) {
                    $teamCertificatesData['team_member_id'] = $team->id;
                    $teamCertificatesData['training_id'] = $certificate['training_id'];
                    $teamCertificatesData['certificate_file'] = null;
                    $teamCertificatesData['certificate_issue_on'] = $certificate['certificate_issue_on'] ?? null;
                    $teamCertificatesData['certificate_valid_until'] = $certificate['certificate_valid_until'] ?? null;

                    if (isset($certificate['certificate_file']) && $certificate['certificate_file'] instanceof UploadedFile) {
                        $folderPath = 'public/uploads/teams';
                        if (! Storage::exists($folderPath)) {
                            Storage::makeDirectory($folderPath, 0775, true);
                        }
                        $certificateFile = $certificate['certificate_file'];
                        // Use the original filename for storage
                        $originalFileName = $certificateFile->getClientOriginalName();
                        $certificate_file_path = $certificateFile->storeAs($folderPath, $originalFileName);
                        $teamCertificatesData['certificate_file'] = $certificate_file_path;
                    }
                    TeamCertificatesAndTraining::create($teamCertificatesData);
                }
            }
        }

        return $team;
    }

    public function update($id, TeamData $data): Team
    {
        $teamData = $data->toArray();
        $companyDetail = CompanyDetail::where('id', $data->companyId ?? selectedCompany()->id)->first();
        $trainingData['user_id'] = $companyDetail->user_id;
        $trainingData['company_id'] = $companyDetail->id;
        $teamRoles = $teamData['team_roles'] ?? '';
        $teamCertificates = $teamData['team_certificates'] ?? '';
        unset($teamData['team_roles'], $teamData['team_certificates']);
        $team = Team::findOrFail($id);
        $team->update($teamData);

        if ($team->id) {
            TeamsFeaturedRole::where('team_member_id', $team->id)->delete();
            $teamRolesData = [];
            if ($teamRoles) {
                foreach ($teamRoles as $key => $teamRoleId) {
                    $teamRolesData[$key]['team_member_id'] = $team->id;
                    $teamRolesData[$key]['featured_role_id'] = $teamRoleId;
                }
                foreach ($teamRolesData as $role) {
                    TeamsFeaturedRole::create($role);
                }
            }

            TeamCertificatesAndTraining::where('team_member_id', $team->id)->forceDelete();

            $teamCertificatesData = [];
            if ($teamCertificates) {
                foreach ($teamCertificates as $certificate) {
                    $teamCertificatesData['team_member_id'] = $team->id;
                    $teamCertificatesData['training_id'] = $certificate['training_id'];
                    $teamCertificatesData['certificate_file'] = $certificate['certificate_file'];
                    $teamCertificatesData['certificate_issue_on'] = $certificate['certificate_issue_on'] ?? null;
                    $teamCertificatesData['certificate_valid_until'] = $certificate['certificate_valid_until'] ?? null;

                    if (isset($certificate['certificate_file']) && $certificate['certificate_file'] instanceof UploadedFile) {
                        $folderPath = 'public/uploads/teams';
                        if (! Storage::exists($folderPath)) {
                            Storage::makeDirectory($folderPath, 0775, true);
                        }
                        $certificateFile = $certificate['certificate_file'];
                        $certificate_file_path = $certificateFile->store($folderPath);
                        $teamCertificatesData['certificate_file'] = $certificate_file_path;
                    }

                    TeamCertificatesAndTraining::create($teamCertificatesData);
                }
            }
        }

        return $team;
    }

    public function TrainingUpdate($id, TeamCertificateAndTrainingData $data): CertificateAndTraining
    {
        $trainingData = $data->toArray();
        $companyDetail = CompanyDetail::where('id', $data->companyId ?? selectedCompany()->id)->first();
        $trainingData['user_id'] = $companyDetail->user_id;
        $trainingData['company_id'] = $companyDetail->id;
        $training = CertificateAndTraining::findOrFail($id);
        $training->update($trainingData);

        return $training;
    }

    public function createTeamRole(TeamRoleData $data): FeaturedRole
    {
        $teamRoleData = $data->toArray();
        $companyDetail = CompanyDetail::where('id', $data->companyId ?? selectedCompany()->id)->first();
        $teamRoleData['user_id'] = $companyDetail->user_id;
        $teamRoleData['company_id'] = $companyDetail->id;

        return FeaturedRole::create($teamRoleData);
    }

    public function updateTeamRole(int $id, TeamRoleData $data): FeaturedRole
    {
        $teamRoleData = $data->toArray();
        $teamRole = FeaturedRole::findOrFail($id);
        $teamRole->update($teamRoleData);

        return $teamRole;
    }

    public function createTeamCertificateAndTraining($data): CertificateAndTraining
    {
        $trainingData = $data->toArray();
        $company = CompanyDetail::where('id', $data->companyId ?? selectedCompany()->id)->first();
        $trainingData['user_id'] = $company->user_id;
        $trainingData['company_id'] = $company->id;
        $training = CertificateAndTraining::create($trainingData);

        return $training;
    }

    public function delete($id)
    {
        $team = Team::find($id);
        if ($team) {
            $team->delete();
        }
    }

    public function roleDelete(int $id): bool
    {
        $role = FeaturedRole::find($id);
        if ($role) {
            return $role->delete();
        }

        return false;
    }
}
