<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RecoveryCodeRequest;
use App\Http\Requests\Auth\VerifyCodeRequest;
use App\Models\CompanyDetail;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;

class AuthenticatedSessionController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();
        $user = Auth::user();

        if (! $user->hasVerifiedEmail()) {
            return to_route('verification.notice');
        }

        $this->authService->handleLogin($request);

        if ($user->two_factor_secret && $user->is_two_factor_enabled) {
            $this->startTwoFactorAuthentication($request, $user);

            return redirect()->route('two.factor.authentication');
        }

        return $this->redirectAfterLogin($user);
    }

    public function loginTwoFactor(): Response
    {
        return Inertia::render('Auth/TwoFactorAuthentication');
    }

    public function recoveryCode(RecoveryCodeRequest $request)
    {
        $user = $this->get2faUser($request);
        if (! $user || ! in_array($request->recoveryCode, $user->two_factor_recovery_codes)) {
            throw ValidationException::withMessages(['recoveryCode' => 'The recovery code is invalid.']);
        }

        return $this->attemptLogin($request, $user);
    }

    public function verify(VerifyCodeRequest $request)
    {
        $this->verifyTwoFactorAuthentication($request);
    }

    protected function verifyTwoFactorAuthentication($request)
    {
        $user = $this->get2faUser($request);
        if (! $user) {
            return redirect()->route('login');
        }

        $google2fa = new Google2FA;
        if (! $google2fa->verifyKey($user->two_factor_secret, $request->code, 0)) {
            throw ValidationException::withMessages(['code' => 'The one time password is invalid.']);
        }

        return $this->attemptLogin($request, $user);
    }

    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    protected function startTwoFactorAuthentication(Request $request, User $user)
    {
        $request->session()->put([
            '2fa:user:id' => $user->id,
            '2fa:user:credentials' => $request->only('email', 'password'),
            '2fa:auth:attempt' => true,
        ]);

        auth()->logout();
    }

    protected function get2faUser(Request $request)
    {
        $sessionData = $request->session()->only(['2fa:user:id', '2fa:auth:attempt']);
        if (empty($sessionData['2fa:user:id']) || ! $sessionData['2fa:auth:attempt']) {
            return null;
        }

        return User::find($sessionData['2fa:user:id']);
    }

    protected function attemptLogin(Request $request, User $user): RedirectResponse
    {
        $credentials = $request->session()->get('2fa:user:credentials');

        if (Auth::attempt($credentials)) {
            $this->clear2faSession($request);

            return $this->redirectAfterLogin($user);
        }

        return redirect()->route('login')->withErrors(['password' => 'The provided credentials are incorrect.']);
    }

    protected function clear2faSession(Request $request)
    {
        $request->session()->forget(['2fa:user:id', '2fa:user:credentials', '2fa:auth:attempt']);
    }

    protected function redirectAfterLogin(User $user): RedirectResponse
    {
        return $user->hasRole('admin') ? redirect()->route('admin.overview') : redirect()->route('overview');
    }

    public function impersonate(CompanyDetail $company)
    {
        $this->authService->userImpersonate($company);
        return to_route('overview');
    }

    public function exitImpersonate()
    {
        $this->authService->exitImpersonate();
        return to_route('admin.all.companies');
    }
}
