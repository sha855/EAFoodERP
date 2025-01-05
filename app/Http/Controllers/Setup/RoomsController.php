<?php

namespace App\Http\Controllers\Setup;

use App\Data\Setup\RoomsData;
use App\Enums\RoomTypesEnum;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\Room;
use App\Repositories\ManageFolderRepository;
use App\Repositories\RoomRepository;
use App\Services\RoomService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomsController extends Controller
{
    public function __construct(protected RoomService $roomService, protected RoomRepository $roomRepository, protected ManageFolderRepository $folders) {}

    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Setup/Room/Index', [
            'types' => RoomTypesEnum::cases(),
            'rooms' => $this->roomRepository->getRoom(null, $perPage, $search),
        ]);
    }

    public function show(Request $request, CompanyDetail $company)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');

        return Inertia::render('Admin/Setup/Room/Index', [
            'types' => RoomTypesEnum::cases(),
            'rooms' => $this->roomRepository->getRoom($company, $perPage, $search),
            'folders' => $this->folders->getFolders($company),
        ]);
    }

    public function store(RoomsData $data, ?CompanyDetail $company)
    {
        $this->roomService->createOrUpdateRoom($company, $data);

        return back()->with([
            'message' => __('Setup/Rooms.messages.create'),
            'type' => 'success',
        ]);
    }

    public function update(RoomsData $data, ?CompanyDetail $company, Room $room)
    {
        $this->roomService->createOrUpdateRoom($company, $data);

        return back()->with([
            'message' => __('Setup/Rooms.messages.update'),
            'type' => 'success',
        ]);
    }

    public function updateIsUse(Request $request, Room $room)
    {
        $this->roomService->updateIsUse($room, $request->is_use);

        return back();
    }

    public function destroy(Room $room)
    {
        $this->roomService->destroyRoom($room);

        return back()->with([
            'message' => __('Setup/Rooms.messages.delete'),
            'type' => 'success',
        ]);
    }
}
