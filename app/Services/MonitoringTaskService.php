<?php

namespace App\Services;

use App\Models\CompanyDetail;
use App\Models\Equipment;
use App\Models\MonitoringResponsibleRole;
use App\Models\MonitoringTask;
use App\Models\Room;

class MonitoringTaskService
{
    public function createOrUpdate(?CompanyDetail $company, array $data)
    {
        $company_id = $company?->id ?? selectedCompany()?->id;

        $monitoringTask = MonitoringTask::updateOrCreate(
            ['id' => $data['id'] ?? null],
            [
                'name' => $data['task_name'],
                'type' => $data['type'],
                'task_related' => $data['task_related'],
                'summary' => $data['summary'] ?? '',
                'instructions_editor' => $data['instructions_editor'] ?? '',
                'company_id' => $company_id,
                'user_id' => auth()->id(),
                'is_verification' => $data['is_verification'],
                'verifier' => $data['verifier'],
                'frequency' => $data['is_verification'] ? $data['frequency'] : null,
            ]
        );

        $taskRelated = $data['task_related'] === 'rooms' ? Room::class : Equipment::class;

        $monitoringTask->responsibleRoles()->delete();
        $monitoringTask->associations()->delete();
        $monitoringTask->usedFors()->delete();

        $this->processCheckList($data['data']['check-list'] ?? [], $monitoringTask->id, $taskRelated);
        $this->processTaskDetailsSingle($data['data']['task-details-single'] ?? [], $monitoringTask->id, $taskRelated);
        $this->processTaskDetailsMultipleFields($data['data']['task-details-multiple-fields'] ?? [], $data['task_related'], $monitoringTask);
        $this->processUsedFor($data['data']['used-for'] ?? [], $taskRelated, $monitoringTask);
    }

    private function processCheckList(array $checkList, int $monitoringTaskId, string $taskRelated)
    {
        foreach ($checkList as $checks) {
            foreach ($checks as $check) {
                if (! empty($check['assignTask']) && ! empty($check['frequency'])) {
                    MonitoringResponsibleRole::create($this->extractResponsibleRoleData($check, $monitoringTaskId, $taskRelated));
                }
            }
        }
    }

    private function processTaskDetailsSingle(array $taskDetails, int $monitoringTaskId, string $taskRelated)
    {
        if (
            ! empty($taskDetails['assignTask']) &&
            ! empty($taskDetails['frequency']) &&
            $taskDetails['isAssignTask'] === true &&
            $taskDetails['isFrequency'] === true
        ) {
            MonitoringResponsibleRole::create($this->extractResponsibleRoleData($taskDetails, $monitoringTaskId, $taskRelated));
        }
    }

    private function processTaskDetailsMultipleFields(array $fields, string $taskRelated, MonitoringTask $monitoringTask)
    {
        if (! empty($fields)) {
            $monitoringTask->associations()->create([
                'monitoring_task_id' => $monitoringTask->id,
                'associable_type' => $taskRelated,
                'fields' => $fields,
            ]);
        }
    }

    private function processUsedFor(array $useFor, string $taskRelated, MonitoringTask $monitoringTask)
    {
        foreach ($useFor['data'] ?? [] as $use) {
            if (! empty($use) && $use['value'] === true) {
                $monitoringTask->usedFors()->create([
                    'monitoring_task_id' => $monitoringTask->id,
                    'usefor_type' => $taskRelated,
                    'usefor_id' => $use['id'],
                ]);
            }
        }
    }

    private function extractResponsibleRoleData(array $check, int $monitoringTaskId, string $taskRelated): array
    {
        return [
            'monitoring_task_id' => $monitoringTaskId,
            'task_related' => $taskRelated,
            'is_assign_task' => $check['isAssignTask'] ?? false,
            'assign_task_to' => $check['assignTask'],
            'frequency' => $check['frequency'],
            'is_frequency' => $check['isFrequency'] ?? false,
            'custom' => $check['custom'] ?? null,
            'allow_not_done' => $check['allowNotDone'] ?? false,
            'room_equipment_id' => $check['data_id'] ?? null,
            'checklist_task_title' => $check['name'] ?? null,
            'name' => $check['name'] ?? null,
            'is_multiple' => ! empty($check['data_id']),
        ];
    }

    public function updateStatus(MonitoringTask $monitoringTask, $status)
    {
        $monitoringTask->is_enabled = $status;
        $monitoringTask->save();
    }
}
