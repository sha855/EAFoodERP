<?php

namespace App\Services;

use App\Data\Setup\RoomsData;
use App\Models\CompanyDetail;
use App\Models\Room;

class RoomService
{
    public function createOrUpdateRoom(?CompanyDetail $company, RoomsData $data): ?Room
    {
        $dataArray = $data->toArray();
        $dataArray['company_id'] = $company?->id ?? selectedCompany()?->id;

        return Room::updateOrCreate(
            ['id' => $dataArray['id'] ?? null],
            $dataArray
        );
    }

    public function updateIsUse(Room $room, $isUse): void
    {
        $room->is_use = $isUse;
        $room->save();
    }

    public function destroyRoom(Room $room): void
    {
        $room->delete();
    }
}
