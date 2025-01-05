<?php

namespace App\Services;

use App\Mail\PasswordResetMail;
use App\Mail\VerifyEmail;
use App\Models\CompanyDetail;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class EmailService
{
    /**
     * Send a verification email to the user.
     */
    public function sendVerificationEmail(string $email, object $user): void
    {
        Mail::to($email)->send(new VerifyEmail($user));
    }

    /**
     * Send a password reset email.
     */
    public function sendPasswordResetEmail(string $email): bool
    {
        $user = User::where('email', $email)->firstOrFail();
        $token = Password::createToken($user);

        Mail::to($email)->send(new PasswordResetMail($user, $token));

        return true;
    }
}

