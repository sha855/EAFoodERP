<?php

namespace App\Services;

use App\Data\Users\UpdateUserPhone;
use App\Data\Users\UserRegistrationData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserRegistrationService
{
    public function register(UserRegistrationData $data): User
    {
        $user = User::create([
            'name' => $data->name,
            'email' => $data->email,
            'password' => Hash::make($data->password),
        ]);
        $user->assignRole('user');
        Auth::login($user);

        return $user;
    }

    public function updateUser(UpdateUserPhone $userData): User
    {
        $user = Auth::user();

        // Update the user's std_code and phone_no
        $user->update([
            'std_code' => $userData->stdcode,
            'phone_no' => $userData->phone,
        ]);

        $latestCompanyDetail = $user->companyDetail()->first();

        if ($latestCompanyDetail) {
            $latestCompanyDetail->update([
                'country_name' => $userData->country,
            ]);
        }

        return $user;
    }
}
