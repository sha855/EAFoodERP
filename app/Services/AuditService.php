<?php

namespace App\Services;

use App\Data\Audit\AuditUploadData;
use App\Models\Audit;
use Illuminate\Support\Facades\Auth;

class AuditService
{
    public function uploadFiles(AuditUploadData $fileUploadData): array
    {
        $uploadedFilePaths = [];
        foreach ($fileUploadData->files as $file) {
            $filePath = $file->store('uploads/audits', 'public');

            Audit::create([
                'auditor' => $file->getClientOriginalName(),
                'audit_date' => now(),
                'file_path' => $filePath,
                'user_id' => Auth::id(),
                'company_id' => $fileUploadData->companyId ?? selectedCompany()->id,
            ]);
            $uploadedFilePaths[] = $filePath;
        }

        return $uploadedFilePaths;
    }

    public function delete(Audit $audit)
    {
        return $audit->delete();
    }
}
