<?php

namespace Database\Seeders;

use App\Models\WorkGroupTask;
use Illuminate\Database\Seeder;

class WorkGroupTaskSeeder extends Seeder
{
    public function run(): void
    {
        $tasks = [
            ['name' => 'Responsible for food safety plan updates *'],
            ['name' => 'Contract negotiations/supplier relations'],
            ['name' => 'Employees training'],
            ['name' => 'Daily health check *'],
            ['name' => 'Orders, deliveries, storage, stocktake'],
            ['name' => 'Food handling control and quality management'],
            ['name' => 'Maintenance of rooms and devices'],
            ['name' => 'eferfgerg'],
            ['name' => 'Waste management *'],
            ['name' => 'Pest control *'],
            ['name' => 'Cleaning and disinfection management'],
            ['name' => 'Customers’ complaints management'],
        ];

        foreach ($tasks as $task) {
            WorkGroupTask::create([
                'name' => $task['name'],
            ]);
        }
    }
}
