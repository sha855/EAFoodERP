<?php

namespace App\Http\Controllers\Admin;

use App\Data\Setting\AdminSettingData;
use App\Http\Controllers\Controller;
use App\Repositories\SettingRepository;
use App\Services\SettingService;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(protected SettingRepository $repository,
        protected SettingService $service
    ) {}

    public function index()
    {
        return Inertia::render('Admin/Setting/Index', [
            'setting' => $this->repository->getSettingData(),
        ]);
    }

    public function generalSetting()
    {
        return Inertia::render('Admin/Setting/General', [
            'setting' => $this->repository->getSettingData(),
        ]);
    }

    public function clearCache()
    {
        $this->service->clearCache();

        return back()->with([
            'message' => 'Cache clear Successfully',
            'type' => 'success',
        ]);
    }

    public function storageLink()
    {
        $this->service->storageLink();

        return back()->with([
            'message' => 'Storage link Successfully',
            'type' => 'success',
        ]);
    }

    public function update(AdminSettingData $data)
    {
        $this->service->createOrUpdateAdminSetting($data);

        return back()->with([
            'message' => 'Setting Data Updated Successfully',
            'type' => 'success',
        ]);
    }
}
