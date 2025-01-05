<?php

namespace App\Http\Controllers\Setup;

use App\Data\Setup\EquipmentData;
use App\Enums\EquipmentTypeEnum;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\Equipment;
use App\Repositories\EquipmentRepository;
use App\Repositories\ManageFolderRepository;
use App\Repositories\RoomRepository;
use App\Services\EquipmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function __construct(protected RoomRepository $roomRepository, protected EquipmentService $equipmentService, protected EquipmentRepository $equipmentRepository, protected ManageFolderRepository $folders) {}

    public function index(Request $request, CompanyDetail $company)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Setup/Equipment/Index', [
            'types' => EquipmentTypeEnum::cases(),
            'rooms' => $this->roomRepository->getAll(),
            'equipments' => $this->equipmentRepository->getEquipments($company, $perPage, $search),
        ]);
    }

    public function store(EquipmentData $data, ?CompanyDetail $company)
    {
        $this->equipmentService->createOrUpdateEquipment($company, $data);

        return back()->with([
            'message' => __('Setup/Equipment.messages.create'),
            'type' => 'success',
        ]);
    }

    public function show(Request $request, CompanyDetail $company)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Admin/Setup/Equipment/Index', [
            'types' => EquipmentTypeEnum::cases(),
            'rooms' => $this->roomRepository->getAll($company),
            'equipments' => $this->equipmentRepository->getEquipments($company, $perPage, $search),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function update(EquipmentData $data, ?CompanyDetail $company, Equipment $equipment)
    {
        $this->equipmentService->createOrUpdateEquipment($company, $data, $equipment);

        return back()->with([
            'message' => __('Setup/Equipment.messages.update'),
            'type' => 'success',
        ]);
    }

    public function destroy(Equipment $equipment)
    {
        $this->equipmentService->destroyEquipment($equipment);

        return back()->with([
            'message' => __('Setup/Equipment.messages.delete'),
            'type' => 'success',
        ]);
    }

    public function updateIsUse(Equipment $equipment, Request $request)
    {
        $this->equipmentService->updateIsUse($equipment, $request->is_use);
    }
}
