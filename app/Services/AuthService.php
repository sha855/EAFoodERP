<?php

namespace App\Services;

use App\Http\Requests\Auth\LoginRequest;
use App\Models\CompanyDetail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    /**
     * Handle the authentication and session regeneration.
     *
     * @return RedirectResponse
     */
    public function handleLogin(LoginRequest $request)
    {
        return $request->session()->regenerate();
    }

    public function userImpersonate(CompanyDetail $company)
    {
        $company->update([
            'is_selected' => true,
        ]);
        $user = User::find($company->user_id);

        return Auth::user()->impersonate($user);
    }

    public function exitImpersonate()
    {
        $user = Auth::user();
        $user->companyDetail()
            ->where('is_selected', true)
            ->update(['is_selected' => false]);
        $user->companyDetail()->update(['is_selected' => true]);

        return Auth::user()->leaveImpersonation();
    }
}
