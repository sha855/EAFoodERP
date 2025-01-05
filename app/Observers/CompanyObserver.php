<?php

namespace App\Observers;

use App\Models\CompanyDetail;
use App\Models\Equipment;
use App\Models\Room;

class CompanyObserver
{
    public function created(CompanyDetail $company): void
    {
        $nameEquipment = ['Counter Tops', 'Juice press', 'Freezer', 'Coffee machine', 'Floors', 'Toilet'];
        $nameRoom = ['Food delivery', 'Preparation room', 'Production Facility', 'Restroom', 'Refrigerator room', 'Chemical storage'];

        foreach ($nameRoom as $key => $room) {
            $createdRoom = Room::factory()->create([
                'name' => $room,
                'company_id' => $company->id,
            ]);

            Equipment::factory()->create([
                'room_id' => $createdRoom->id,
                'name' => $nameEquipment[$key],
                'company_id' => $company->id,
            ]);
        }
    }
}
