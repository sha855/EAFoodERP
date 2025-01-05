<?php

namespace App\Http\Controllers\Admin\Audit;

use App\Data\Audit\AuditUploadData;
use App\Http\Controllers\Controller;
use App\Models\Audit;
use App\Models\AuditTemplate;
use App\Models\CompanyDetail;
use App\Repositories\AuditRepository;
use App\Repositories\AuditTemplateRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\AuditService;
use App\Services\AuditTemplateService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AuditController extends Controller
{
    public function __construct(
        protected AuditService $service,
        protected AuditTemplateService $templateService,
        protected AuditRepository $repository,
        protected AuditTemplateRepository $templateRepository,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(Request $request, CompanyDetail $company)
    {
        return Inertia::render('Admin/Audit/Index', [
            'folders' => $this->folders->getFolders($company),
            'companyId' => $company->id,
            'audits' => $this->repository->geUserAudit($request->get('per_page', 10), $company),
            'auditTemplate' => $this->templateRepository->getAuditTemplate($company),
        ]);
    }

    public function upload(AuditUploadData $data)
    {
        $this->service->uploadFiles($data);

        return back();
    }

    public function delete(Audit $id)
    {
        $this->service->delete($id);

        return back();
    }

    public function show(AuditTemplate $template, CompanyDetail $company)
    {
        $this->templateService->isConfirmed($template);

        return Inertia::render('Admin/Audit/ShowAudit', [
            'template' => $template,
            'companyId' => $company->id,
        ]);
    }

    public function download($file)
    {
        $filePath = 'uploads/audits/'.$file;

        if (! Storage::disk('public')->exists($filePath)) {
            abort(404, 'File not found.');
        }

        return Storage::disk('public')->download($filePath);
    }
}
