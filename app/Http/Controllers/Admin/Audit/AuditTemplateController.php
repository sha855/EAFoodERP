<?php

namespace App\Http\Controllers\Admin\Audit;

use App\Data\Audit\AuditTemplateData;
use App\Http\Controllers\Controller;
use App\Models\AuditTemplate;
use App\Models\CompanyDetail;
use App\Repositories\AuditRepository;
use App\Repositories\AuditTemplateRepository;
use App\Repositories\ManageFolderRepository;
use App\Services\AuditTemplateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditTemplateController extends Controller
{
    public function __construct(protected AuditTemplateService $service,
        protected AuditRepository $repository,
        protected AuditTemplateRepository $auditTemplate,
        protected ManageFolderRepository $folders,
    ) {}

    public function index(Request $request, CompanyDetail $company)
    {
        return Inertia::render('Admin/Audit/Template', [
            'folders' => $this->folders->getFolders($company),
            'companyId' => $company->id,
            'template' => $this->auditTemplate->getSpecificTemplate($request->get('per_page', 10), $company),
        ]);
    }

    public function create(CompanyDetail $company)
    {
        return Inertia::render('Admin/Audit/CreateTemplate', [
            'companyId' => $company->id,
            'auditFrequencies' => $this->auditTemplate->getAuditFrequencies(),
            'frequencies' => $this->auditTemplate->getFrequencies(),
        ]);
    }

    public function store(AuditTemplateData $data)
    {
        $this->service->create($data);

        return back();
    }

    public function show(AuditTemplate $template)
    {
        return Inertia::render('Admin/Audit/ShowAuditTemplate', [
            'template' => $template,
        ]);
    }

    public function edit(AuditTemplate $template)
    {
        return Inertia::render('Admin/Audit/TemplateEdit', [
            'template' => $template,
            'auditFrequencies' => $this->auditTemplate->getAuditFrequencies(),
            'frequencies' => $this->auditTemplate->getFrequencies(),
        ]);
    }

    public function update(AuditTemplateData $data, $id)
    {
        $this->service->update($data, $id);

        return back();
    }

    public function destroy(AuditTemplate $template)
    {
        $this->service->delete($template);

        return back();
    }

    public function auditCreate(AuditTemplate $template, CompanyDetail $company)
    {
        return Inertia::render('Admin/Audit/AuditTemplateCreate', [
            'template' => $template,
            'companyId' => $company->id,
        ]);
    }

    public function auditTemplateDetail(AuditTemplateData $data)
    {
        $this->service->templateDetailUpdate($data);

        return back();
    }
}
