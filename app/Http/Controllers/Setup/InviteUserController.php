<?php

namespace App\Http\Controllers\Setup;

use App\Data\Setup\InviteUserData;
use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InviteUserController extends Controller
{
    public function __construct(
        protected UserService $userService,
        protected UserRepository $userRepository,
    ) {}

    public function inviteUserSetPassword(Request $request)
    {
        $token = $request->query('token');

        return Inertia::render('Invites/InviteUserSetPassword', [
            'users' => $this->userRepository->getInviteUser($token),
        ]);
    }


    public function storeSetPassword(InviteUserData $data)
    {        
        $updatedData = $this->userService->inviteUserSetPass($data);

        if ($updatedData) {
            return redirect()->route('overview')->with('success', 'Your password has been set successfully!');
        } else {
            return back()->withErrors(['update' => 'Failed to update user information. Please try again.']);
        }
    }
}
