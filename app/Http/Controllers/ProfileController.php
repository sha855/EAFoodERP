<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\VerifyCodeRequest;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FAQRCode\Google2FA;
use PragmaRX\Recovery\Recovery;

class ProfileController extends Controller
{
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
        $user = $request->user();
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function enableTwoFactor(Request $request)
    {
        $user = auth()->user();

        $validated = Auth::guard('web')->validate([
            'email' => $user->email,
            'password' => $request->password,
        ]);

        if (! $validated) {
            throw ValidationException::withMessages([
                'password' => 'The password is incorrect.',
            ]);
        }

        $google2fa = new Google2FA;
        $secretKey = $google2fa->generateSecretKey();

        $qrCode = $google2fa->getQRCodeInline(
            env('APP_NAME'),
            $user->email,
            $secretKey
        );

        return response(['qr' => $qrCode, 'secretKey' => $secretKey], 200);
    }

    public function confirmablePassword(Request $request)
    {
        $user = auth()->user();

        $validated = Auth::guard('web')->validate([
            'email' => $user->email,
            'password' => $request->password,
        ]);

        if (! $validated) {
            throw ValidationException::withMessages([
                'password' => 'The password is incorrect.',
            ]);
        }

        return response()->json(['success' => true], 200);
    }

    public function twoFactorAuthenticationConfirm(VerifyCodeRequest $request)
    {
        $user = auth()->user();
        $google2fa = new Google2FA;
        $recovery = new Recovery;

        $window = 0;

        $valid = $google2fa->verifyKey($request->secretKey, $request->code, $window);
        if (! $valid) {
            throw ValidationException::withMessages([
                'code' => 'The one time password is invalid.',
            ]);
        }

        $user->two_factor_secret = $request->secretKey;
        $user->is_two_factor_enabled = 1;
        $user->two_factor_recovery_codes = $recovery->toArray();
        $user->save();

        return back()->with([
            'message' => '2FA Enable successfully!',
            'type' => 'success',
        ]);
    }

    public function twoFactorAuthenticationDisable()
    {
        $user = auth()->user();

        $user->two_factor_secret = null;
        $user->is_two_factor_enabled = 0;
        $user->two_factor_recovery_codes = null;
        $user->save();

        return back()->with([
            'message' => '2FA disable successfully!',
            'type' => 'success',
        ]);
    }

    public function regenerateRecoveryCode()
    {
        $user = auth()->user();
        $recovery = new Recovery;
        $user->two_factor_recovery_codes = $recovery->toArray();
        $user->save();

        return back()->with([
            'message' => 'Regenerate Recovery Code successfully!',
            'type' => 'success',
        ]);
    }
}
