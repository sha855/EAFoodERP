<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function login()
    {
        if (Auth::check()) {
            return Auth::user()->email_verified_at
                ? Inertia::render('Dashboard/Overview')
                : redirect()->route('verification.notice');
        }

        return Inertia::render('Auth/Login');
    }
}
