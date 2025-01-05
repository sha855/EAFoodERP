<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

class VerifyEmailController extends Controller
{
    public function __invoke($hash)
    {
        $user = auth()->user();

        if (! hash_equals((string) $hash, sha1($user->email))) {
            abort(403, 'Invalid verification link.');
        }
        if ($user->hasVerifiedEmail()) {
            return to_route('overview')->with('status', 'Your email is already verified.');
        }
        $user->markEmailAsVerified();

        return to_route('overview')->with('status', 'Your email has been successfully verified.');
    }
}
