<?php

namespace App\Repositories;

use App\Enums\AuditFrequencyEnum;
use App\Enums\FrequencyEnum;
use App\Models\AuditTemplate;
use App\Models\CompanyDetail;

class AuditTemplateRepository
{
    public function getAuditTemplate(CompanyDetail $company)
    {
        return AuditTemplate::where('company_id', $company->id)->get();
    }

    public function getSpecificTemplate(int $perPage, CompanyDetail $company)
    {
        return AuditTemplate::where('company_id', $company->id)->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function getAuditFrequencies()
    {

        $auditFrequencies = [];
        foreach (AuditFrequencyEnum::cases() as $case) {
            $auditFrequencies[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $auditFrequencies;
    }

    public function getFrequencies()
    {
        $frequencies = [];
        foreach (FrequencyEnum::cases() as $case) {
            $frequencies[] = [
                'label' => $case->label(),
                'value' => $case->value,
            ];
        }

        return $frequencies;
    }
}
