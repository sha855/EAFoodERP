<?php

namespace App\Http\Middleware;

use App\Menu\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user()?->load(['companyDetail']),
                'roles' => Auth::user() ? Auth::user()->getRoleNames() : null,
                'selectedCompany' => selectedCompany(),
                'imperonatedUser' => Session::get('impersonated_by'),
            ],
            'flash' => [
                'message' => function () use ($request) {
                    return $request->session()->get('message');
                },
                'type' => function () use ($request) {
                    return $request->session()->get('type');
                },
            ],
            'settings' => getSettings(),
            'translation' => getTranslations(),
            'menuSideBar' => Menu::main(),
        ]);
    }
}
