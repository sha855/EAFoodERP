<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\UserRepository;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(protected UserRepository $user) {}

    public function overview()
    {
        return Inertia::render('Dashboard/Overview');
    }
}
