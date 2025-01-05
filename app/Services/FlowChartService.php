<?php

namespace App\Services;

use App\Data\HaccpPlan\FlowChartProcessArrayData;
use App\Data\HaccpPlan\FlowChartUploadData;
use App\Models\FlowChart;
use App\Models\FlowChartProcessStep;

class FlowChartService
{
    public function uploadFile(FlowChartUploadData $data)
    {

        $uploadedFilePaths = [];
        foreach ($data->files as $file) {
            $filePath = $file->store('uploads/flowChart', 'public');
            FlowChart::create([
                'name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'company_id' => selectedCompany()->id ?? $data->companyId,
            ]);
            $uploadedFilePaths[] = $filePath;
        }

        return $uploadedFilePaths;

    }

    public function delete(FlowChart $flowChart)
    {
        return $flowChart->delete();
    }

    public function flowChartProcessStore(FlowChartProcessArrayData $flowChartProcess)
    {
        $process = collect($flowChartProcess->processSteps)->first();
        $filePath = $flowChartProcess?->image?->store('uploads/flowChart', 'public');

        $flowchart = FlowChart::create([
            'name' => $process->processName,
            'file_path' => $filePath,
            'company_id' => selectedCompany()->id ?? $process->companyId,
        ]);
        foreach ($flowChartProcess->processSteps as $step) {
            FlowChartProcessStep::create([
                'flow_chart_id' => $flowchart->id,
                'company_id' => selectedCompany()->id ?? $step->companyId,
                'process_step' => $step->processStep,
                'type' => $step->type,
                'is_time' => $step->isTime,
                'is_temperature' => $step->isTemperature,
                'is_quality' => $step->isQuality,
                'is_recording' => $step->isRecording,
                'instruction' => $step->instruction,
            ]);
        }

        return $flowchart;

    }
}
