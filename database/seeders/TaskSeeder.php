<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Task::create([
            'name' => 'Task 1',
            'description' => 'Description for Task 1',
            'is_required' => true,
        ]);

        Task::create([
            'name' => 'Task 2',
            'description' => 'Description for Task 2',
            'is_required' => false,
        ]);
    }
}
