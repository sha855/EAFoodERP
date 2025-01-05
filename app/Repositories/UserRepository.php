<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserRepository
{
    public function getAllUser(int $perPage = 10)
    {
        return User::with('roles', 'companyDetail')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'admin');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getUsersStatus(int $perPage = 10)
    {
        $users = User::with(['roles', 'companyDetail'])
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'admin');
            })
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);

            $users->getCollection()->each(function ($user) {
                $user->status = $user->email_verified_at ? 'Active user' : 'Invitation sent';
            });

        return $users;
    }

    public function getInviteUser($token = '')
    {
        $users = User::select('id', 'name', 'email', 'token')
            ->where('token', $token)
            ->first();
        return $users;
    }

    public function getUserDetail(User $user)
    {
        return $user->load('companyDetail', 'companyDetail.businessType', 'companyDetail.businessUnit');
    }

    public function getCompanySpecific(int $perPage, User $user)
    {
        return $user->companyDetail()
            ->with('businessType', 'businessUnit')
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public function getCompanyDetail(CompanyDetail $company)
    {
        return $company;
    }

    public function getCompanyDetailbyId(CompanyDetail $company)
    {
        return $company->load('user', 'businessType', 'businessUnit.customerGroup');
    }

    public function getAllCompanies(int $perPage = 10)
    {
        return CompanyDetail::orderBy('id', 'desc')->paginate($perPage);
    }

    public function getCompany()
    {
        return selectedCompany();
    }

    public function companyHaccpStatus()
    {
        return Auth::user()->companyDetail->first();
    }

    public function getUsers()
    {
        return User::with('roles')
            ->whereDoesntHave('roles', function ($query) {
                $query->where('name', 'admin');
            })
            ->orderBy('created_at', 'desc')->get();
    }
}
