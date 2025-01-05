<?php

namespace App\Services;

use App\Data\API\BusinessUserData;
use App\Data\API\ContactUsData;
use App\Data\Setup\UserData;
use App\Data\Users\CreateCompanyUserData;
use App\Data\Users\UpdateUser;
use App\Enums\SharedRights;
use App\Enums\SharedRightsLocation;
use App\Models\BusinessUser;
use App\Models\CompanyDetail;
use App\Models\ContactUs;
use App\Models\Team;
use App\Models\TeamsFeaturedRole;
use App\Models\User;
use App\Repositories\TeamRepository;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserService
{
    protected $repository;

    protected $teamRepository;

    public function __construct(UserRepository $repository, TeamRepository $teamRepository)
    {
        $this->repository = $repository;
        $this->teamRepository = $teamRepository;
    }

    public function grtUserStatus($perPage = 10)
    {
        $users = $this->repository->getUsers($perPage);

        $users->getCollection()->transform(function ($user) {
            $user['status'] = $user['email_verified_at'] ? 'Active user' : 'Invitation sent';

            return $user;
        });

        return $users->toArray();
    }

    public function getRole()
    {
        return $this->teamRepository->geTeamRoles(selectedCompany());
    }

    public function getSharedRights()
    {
        return [
            'sharedRights' => SharedRights::options(),
            'sharedRightsLocation' => SharedRightsLocation::options(),
        ];
    }

    public function update(UpdateUser $data, $user): bool
    {
        $user = User::find($user);

        return $user->update($data->toarray());
    }

    public function delete(User $user): ?bool
    {
        return $user->delete();
    }

    public function create(UserData $data)
    {
        $companyDetail = CompanyDetail::where('id', selectedCompany()->id ?? $data->companyId)->first();
        $randomToken = Str::random(30);

        $user = User::create([
            'name' => $data->firstName . ' ' . $data->lastName,
            'email' => $data->email,
            'company_id' => $companyDetail->id,
            'password' => '',
            'token' => $randomToken,
        ]);
        $user->assignRole('user');

        $teamData = [
            'user_id' => $user->id,
            'company_id' => $companyDetail->id,
            'first_last_name' => $data->firstName . ' ' . $data->lastName,
            'email' => $data->email,
        ];

        $team = Team::create($teamData);

        if ($team->id && !empty($data->roles) && is_array($data->roles)) {
            $roleIds = collect($data->roles)->pluck('id')->toArray();

            $rolesData = collect($roleIds)->map(function ($roleId) use ($team) {
                return [
                    'team_member_id' => $team->id,
                    'featured_role_id' => $roleId,
                ];
            })->toArray();

            TeamsFeaturedRole::insert($rolesData);
        }

        return $user;
    }

    public function inviteUserSetPass($data): bool
    {   
        $token = $data->token;
        if (!$token) {
            return false; 
        }
        $user = User::where('token', $token)->first();
        
        if (!$user) {
            return false;
        }

        return $user->update([
            'name' => $data->name,
            'password' => Hash::make($data->password),
            'token' => null, 
            'email_verified_at' => now(), 
        ]);
    }


    public function haccpStatusUpdate(CompanyDetail $company)
    {
        return $company->update([
            'is_haccp_completed' => true,
        ]);
    }

    public function creatNewUser(CreateCompanyUserData $data)
    {
        $dataArray = $data->toArray();
        $dataArray['password'] = Hash::make($data->password);
        $dataArray['email_verified_at'] = now();
        $user = User::create($dataArray);
        $dataArray['user_id'] = $user->id;
        $dataArray['is_selected'] = 1;
        CompanyDetail::Create($dataArray);
        $user->assignRole('user');

        return $user;
    }

    public function storeContactUser(ContactUsData $data)
    {
        return ContactUs::create($data->toArray());
    }

    public function storeBusinessUser(BusinessUserData $data)
    {
        return BusinessUser::create($data->toArray());
    }
}
