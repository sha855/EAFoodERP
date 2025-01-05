<?php

namespace App\Http\Controllers\Monitor;

use App\Http\Controllers\Controller;
use App\Repositories\MonitoringRepository;
use App\Repositories\TeamRepository;
use Inertia\Inertia;

class MonitorController extends Controller
{
    public function __construct(protected TeamRepository $teamRepository, protected MonitoringRepository $monitoringRepository) {}

    public function index()
    {
        return Inertia::render('Monitor/Index', [
            'status' => [
                'monitors' => $this->monitoringRepository->getMonitoringTaskStatus(),
                'users' => $this->teamRepository->getTeamsMemberStatus(),
            ],
        ]);
    }
}
