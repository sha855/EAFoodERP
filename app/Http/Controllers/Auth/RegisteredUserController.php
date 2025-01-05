<?php

namespace App\Http\Controllers\Auth;

use App\Data\Users\UpdateUserPhone;
use App\Data\Users\UserRegistrationData;
use App\Http\Controllers\Controller;
use App\Services\UserRegistrationService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    public function __construct(protected UserRegistrationService $service) {}

    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(UserRegistrationData $data): RedirectResponse
    {
        $this->service->register($data);

        return to_route('company.register');
    }

    public function updatePhone(UpdateUserPhone $data)
    {
        $user = $this->service->updateUser($data);

        if ($user->email_verified_at) {

            return to_route('overview');
        } else {

            return to_route('verification.notice');
        }
    }
}
