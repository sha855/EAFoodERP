<?php

namespace App\Http\Controllers\Audit;

use App\Data\Audit\AuditTemplateData;
use App\Data\Audit\AuditTemplateDetailArrayData;
use App\Http\Controllers\Controller;
use App\Models\AuditTemplate;
use App\Repositories\AuditRepository;
use App\Repositories\AuditTemplateRepository;
use App\Services\AuditTemplateService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuditTemplateController extends Controller
{
    public function __construct(protected AuditTemplateService $service,
        protected AuditRepository $repository,
        protected AuditTemplateRepository $auditTemplate) {}

    public function index(Request $request)
    {
        return Inertia::render('Audit/Template', [
            'template' => $this->auditTemplate->getSpecificTemplate($request->get('per_page', 10), $this->repository->getCurrentCompany()),
        ]);
    }

    public function create()
    {
        return Inertia::render('Audit/CreateTemplate', [
            'auditFrequencies' => $this->auditTemplate->getAuditFrequencies(),
            'frequencies' => $this->auditTemplate->getFrequencies(),
        ]);
    }

    public function store(AuditTemplateData $data)
    {
        $this->service->create($data);

        return to_route('template.index')->with([
            'message' => 'audit template created successfully',
            'type' => 'success',
        ]);
    }

    public function show(AuditTemplate $template)
    {
        return Inertia::render('Audit/ShowAuditTemplate', [
            'template' => $template,
        ]);
    }

    public function edit(AuditTemplate $template)
    {
        return Inertia::render('Audit/TemplateEdit', [
            'template' => $template,
            'auditFrequencies' => $this->auditTemplate->getAuditFrequencies(),
            'frequencies' => $this->auditTemplate->getFrequencies(),
            'companyId' => selectedCompany()->id,
        ]);
    }

    public function update(AuditTemplateData $data, $id)
    {
        $this->service->update($data, $id);

        return to_route('template.index')->with([
            'message' => 'audit template updated successfully',
            'type' => 'success',
        ]);

    }

    public function destroy(AuditTemplate $template)
    {
        $this->service->delete($template);

        return back()->with([
            'message' => 'audit template deleted successfully',
            'type' => 'success',
        ]);
    }

    public function auditCreate(AuditTemplate $template)
    {
        return Inertia::render('Audit/AuditTemplateCreate', [
            'template' => $template,
            'companyId' => selectedCompany()->id,
        ]);
    }

    public function auditTemplateDetail(AuditTemplateDetailArrayData $data)
    {
        $this->service->templateDetailUpdate($data);

        return to_route('audit')->with([
            'message' => 'audit template detail updated successfully',
            'type' => 'success',
        ]);
    }
}
