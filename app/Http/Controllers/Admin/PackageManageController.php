<?php

namespace App\Http\Controllers\Admin;

use App\Data\Membership\PackageData;
use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Repositories\PackageRepository;
use App\Services\PackageService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PackageManageController extends Controller
{
    public function __construct(protected PackageRepository $packages,
        protected PackageService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/MemberShip/Index', [
            'packages' => $this->packages->getAllPackages($request->get('per_page', 10)),
        ]);
    }

    public function store(PackageData $membership)
    {
        $this->service->create($membership);

        return to_route('admin.membership.index')->with(['type' => 'success', 'message' => 'Package Create successfully']);
    }

    public function update(PackageData $data, $membership)
    {
        $this->service->update($data, $membership);

        return back();
    }

    public function destroy(Package $membership)
    {
        $this->service->delete($membership);

        return back();
    }
}
