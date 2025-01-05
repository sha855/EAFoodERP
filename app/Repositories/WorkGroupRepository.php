<?php

namespace App\Repositories;

use App\Models\WorkGroup_tasks;

class WorkGroupRepository
{
    public function getAllTasks()
    {
        return WorkGroup_tasks::all();
    }
}
