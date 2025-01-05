<?php

namespace App\Services;

use App\Data\HaccpPlan\CompanyProcessArrayData;
use App\Data\HaccpPlan\FoodProcessData;
use App\Models\AuditHazard;
use App\Models\CompanyActiveProcess;
use App\Models\CustomProcess;
use App\Models\FoodHazard;
use App\Models\MonitoringHazard;
use App\Models\Process;

class FoodProcessService
{
    public function create(FoodProcessData $data)
    {

        $customProcess = CustomProcess::Create([
            'company_id' => $data->companyId,
            'process_name' => $data->processName,
            'is_active_process' => $data->isActiveProcess,
            'additional_info' => $data->additionalInfo,
            'is_active_add_info' => $data->isActiveAddInfo,
            'hazard_info' => $data->hazardInfo,
            'is_active_hazard_info' => $data->isActiveHazardInfo,
        ]);

        if ($data->potentialHazards) {

            $foodHazard = FoodHazard::updateOrCreate(
                ['company_id' => $data->companyId],
                [
                    'custom_process_id' => $customProcess->id,
                    'company_id' => selectedCompany()->id ?? $data->companyId,
                    'potential_hazards' => $data->potentialHazards,
                    'hazards_type' => $data->hazardsType,
                    'likelihood' => $data->likelihood,
                    'severity' => $data->severity,
                    'risk_level' => $data->riskLevel,
                    'justification_decision' => $data->justificationDecision,
                    'preventive_measure' => $data->preventiveMeasure,
                    'critical_limit' => $data->criticalLimit,
                    'corrective_action' => $data->correctiveAction,
                    'verification' => $data->verification,
                ]);

            foreach ($data->auditTemplateId as $auditTemplateId) {
                AuditHazard::create([
                    'audit_template_id' => $auditTemplateId['id'],
                    'food_hazard_id' => $foodHazard->id,
                ]);
            }
            foreach ($data->monitoringTaskId as $monitoringTaskId) {
                MonitoringHazard::create([
                    'monitoring_task_id' => $monitoringTaskId['id'],
                    'food_hazard_id' => $foodHazard->id,
                ]);
            }

        }

        return $data;
    }

    public function createActiveProcess(CompanyProcessArrayData $data)
    {
        $activeProcess = [];
        foreach ($data->processes as $index => $processData) {
            $activeProcess[] = Process::updateOrCreate(
                [
                    'id' => $processData->id,
                    'company_id' => $processData->companyId,
                ],
                [
                    'is_active' => $processData->isActive,
                    'description' => $processData->description,
                    'activities' => $processData->activities,
                    'order' => $index, 
                ]
            );
        }

        return $activeProcess;
    }

}
