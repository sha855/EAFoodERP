<?php

namespace Database\Seeders;

use App\Models\AnalysesTask;
use Illuminate\Database\Seeder;

class AnalysesTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tasks = [
            'Taking water analyses',
            'Analyses of extending shelf-life',
            'Taking Listeria bacteria (Listeria monocytogenes) analyses (surface sample)',
            'Water system type',
        ];

        foreach ($tasks as $task) {
            AnalysesTask::create([
                'task_name' => $task,
            ]);
        }
    }
}
