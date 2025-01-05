<?php

namespace App\Http\Controllers\Audit;

use App\Data\Audit\AuditUploadData;
use App\Http\Controllers\Controller;
use App\Models\Audit;
use App\Models\AuditTemplate;
use App\Repositories\AuditRepository;
use App\Repositories\AuditTemplateRepository;
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
        protected AuditTemplateRepository $templateRepository
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Audit/Index', [
            'audits' => $this->repository->geUserAudit($request->get('per_page', 10),
                $this->repository->getCurrentCompany()),
            'auditTemplate' => $this->templateRepository->getAuditTemplate($this->repository->getCurrentCompany()),
        ]);
    }

    public function upload(AuditUploadData $data)
    {
        $this->service->uploadFiles($data);
        return back()->with([
            'message' => "audit files updloaded successfully",
            'type' => 'success',
        ]);
    }

    public function delete(Audit $id)
    {
        $this->service->delete($id);
        return back()->with([
            'message' => "audit deleted successfully",
            'type' => 'success',
        ]);
    }

    public function show(AuditTemplate $template)
    {
        $this->templateService->isConfirmed($template);

        return Inertia::render('Audit/ShowAudit', [
            'template' => $template,
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
