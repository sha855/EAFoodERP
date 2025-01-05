<?php

namespace App\Services;

use App\Data\Audit\AuditTemplateData;
use App\Data\Audit\AuditTemplateDetailArrayData;
use App\Models\Audit;
use App\Models\AuditTemplate;
use Illuminate\Support\Facades\Auth;

class AuditTemplateService
{
    public function create(AuditTemplateData $data): AuditTemplate
    {
        $dataArray = $data->toArray();
        $dataArray['user_id'] = Auth::id();
        $dataArray['company_id'] = $data->companyId ?? selectedCompany()->id;
        $auditTemplate = AuditTemplate::create($dataArray);

        return $auditTemplate;
    }

    public function update(AuditTemplateData $data, $id)
    {
        $auditTemplate = AuditTemplate::findOrFail($id);
        $auditTemplate->update($data->toArray());

        return $auditTemplate;
    }

    public function isConfirmed(AuditTemplate $template)
    {
        return $template->update([
            'is_confirmed' => true,
        ]);
    }

    public function delete(AuditTemplate $audit)
    {
        return $audit->delete();
    }

    public function templateDetailUpdate(AuditTemplateDetailArrayData $data)
    {
        $auditTemplate = AuditTemplate::findOrFail($data->id);
        $auditTemplateData = [
            'auditor' => $data->auditor,
            'auditee' => $data->auditee,
            'question' => $data->question,
        ];
        $auditTemplate->update($auditTemplateData);

        Audit::updateOrCreate(
            ['audit_template_id' => $data->id],
            [
                'auditor' => $data->name,
                'auditee' => $data->auditee,
                'company_id' => $data->companyId ?? selectedCompany()->id,
                'audit_date' => $data->startDate,
                'user_id' => Auth::id(),
            ]
        );

        return $auditTemplate;

    }
}
