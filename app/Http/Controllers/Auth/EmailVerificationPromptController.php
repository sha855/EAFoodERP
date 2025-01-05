<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\EmailService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    public function __construct(protected EmailService $emailService) {}

    public function __invoke(Request $request): RedirectResponse|Response
    {
        $user = $request->user();
        if ($user->hasVerifiedEmail()) {
            return to_route('overview');
        }
        $this->emailService->sendVerificationEmail($user->email, $user);

        return Inertia::render('Auth/VerifyEmail', ['status' => session('status')]);
    }
}
