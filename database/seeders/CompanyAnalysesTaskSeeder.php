<?php

namespace Database\Seeders;

use App\Enums\AnalysesFrequency;
use App\Models\CompanyAnalysesTask;
use Illuminate\Database\Seeder;

class CompanyAnalysesTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $analysesTasks = [
            1,
            2,
            3,
            4,
        ];

        foreach ($analysesTasks as $taskId) {
            CompanyAnalysesTask::create([
                'company_id' => 1,
                'frequency' => array_rand(AnalysesFrequency::getOptions()),
                'comment' => 'This is a comment for task '.$taskId,
                'custom_frequency' => 'Custom frequency details for task '.$taskId,
                'analyses_task_id' => $taskId,
            ]);
        }
    }
}
