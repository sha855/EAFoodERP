<?php

namespace App\Services;

use App\Data\HaccpPlan\WorkGroupArrayData;
use App\Data\HaccpPlan\WorkGroupData;
use App\Data\HaccpPlan\WorkGroupResponsibleData;
use App\Models\CustomWorkGroup;
use App\Models\WorkGroup;
use App\Models\WorkGroupUser;

class WorkGroupService
{
    public function create(WorkGroupArrayData $data): void
    {
        foreach ($data->tasks as $taskData) {
            $model = $taskData->isNew ? CustomWorkGroup::class : WorkGroup::class;
            $model::updateOrCreate(
                [
                    'id' => $taskData->id,
                ],
                $taskData->toArray()
            );
        }
    }

    public function delete(WorkGroupData $data)
    {
        $taskModel = $data->isNew ? CustomWorkGroup::class : WorkGroup::class;
        $task = $taskModel::where('id', $data->id)->where('company_id', $data->companyId)->find($data->id);

        return $task->delete();
    }

    public function responsibleUserSync(WorkGroupResponsibleData $data)
    {
        WorkGroupUser::query()->delete();
        foreach ($data->users as $userId) {
            WorkGroupUser::create(['user_id' => $userId]);
        }

        return WorkGroupUser::all();
    }
}
