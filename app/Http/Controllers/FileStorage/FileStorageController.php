<?php

namespace App\Http\Controllers\FileStorage;

use App\Data\FileStorage\FileStorageData;
use App\Data\FileStorage\ShareDocumentData;
use App\Http\Controllers\Controller;
use App\Models\CompanyDetail;
use App\Models\SharedDocument;
use App\Models\SubManageFile;
use App\Notifications\SharedDocumentsEmail;
use App\Repositories\ManageFolderRepository;
use App\Repositories\UserRepository;
use App\Services\EmailService;
use App\Services\FileStorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class FileStorageController extends Controller
{
    public function __construct(
        protected FileStorageService $service,
        protected ManageFolderRepository $repository,
        protected UserRepository $userRepository,
        protected EmailService $mail
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('FileStorage/Index', [
            'folders' => $this->repository->getFolders(selectedCompany()),
            'sharedDocuments' => $this->repository->getSharedDocuments(selectedCompany()),
        ]);
    }

    public function show(Request $request, CompanyDetail $company)
    {
        $perPage = $request->input('per_page', 10);

        return Inertia::render('Admin/FileStorage/Index', [
            'folders' => $this->repository->getFolders($company),
            'sharedDocuments' => $this->repository->getSharedDocuments($company, $perPage),
        ]);
    }

    public function get(CompanyDetail $company)
    {
        return $this->repository->getFolders($company);
    }

    public function folder(Request $request)
    {
        $id = request('id');
        $perPage = $request->input('per_page', 10);
        $files = $this->repository->getSubFolderFiles($perPage, $id);

        return Inertia::render('FileStorage/File', [
            'folders' => $this->repository->getFolders(selectedCompany()),
            'folder' => $this->repository->getSubFolder($id),
            'files' => $files,
        ]);
    }

    public function showFolder(Request $request, CompanyDetail $company)
    {
        $id = request('id');
        $perPage = $request->input('per_page', 10);
        $files = $this->repository->getSubFolderFiles($perPage, $id);

        return Inertia::render('Admin/FileStorage/File', [
            'folders' => $this->repository->getFolders($company),
            'folder' => $this->repository->getSubFolder($id),
            'files' => $files,
        ]);
    }

    public function fileStore(FileStorageData $data)
    {
        $this->service->updateOrCreate($data);

        return back()->with([
            'message' => __('FileStorage/Messages.folder.created'),
            'type' => 'success',
        ]);
    }

    public function fileUpdate(FileStorageData $data, SubManageFile $subManageFile)
    {
        $this->service->updateOrCreate($data, $subManageFile);

        return back()->with([
            'message' => __('FileStorage/Messages.fileUpdate'),
            'type' => 'success',
        ]);
    }

    public function destroyFile(SubManageFile $subManageFile)
    {
        $this->service->destroySubManageFile($subManageFile);

        return back()->with([
            'message' => __('FileStorage/Messages.folder.deleted'),
            'type' => 'success',
        ]);
    }

    public function manageFolders()
    {
        return Inertia::render('FileStorage/Folder', [
            'folders' => $this->repository->getFolders(selectedCompany()),
        ]);
    }

    public function showManageFolders(Request $request, CompanyDetail $company)
    {
        return Inertia::render('Admin/FileStorage/Folder', [
            'folders' => $this->repository->getFolders($company),
        ]);
    }

    public function updateFolder(Request $request)
    {
        $id = $request->id;
        $data['menu'] = $request->name;
        $this->service->updateFolder($id, $data);

        return back()->with([
            'message' => __('FileStorage/Messages.folder.updated'),
            'type' => 'success',
        ]);

    }

    public function deleteFolder(Request $request)
    {
        $id = $request->id;
        $this->service->deleteFolder($id);

        return back()->with(key: [
            'message' => __('FileStorage/Messages.folder.deleted'),
            'type' => 'success',
        ]);

    }

    public function addSubFolder(Request $request)
    {
        $this->service->addFolder($request->all());

        return back()->with([
            'message' => __('FileStorage/Messages.folder.created'),
            'type' => 'success',
        ]);
    }

    public function addFolder(Request $request)
    {
        $this->service->addFolder($request->all());

        return back()->with([
            'message' => __('FileStorage/Messages.folder.created'),
            'type' => 'success',
        ]);
    }

    public function shareAccesses(ShareDocumentData $data)
    {
        $shareDocuments = $this->service->shareDocuments($data);

        $data = $data->toArray();

        $user = Auth::user();
        $data['fromName'] = $user->name;
        $data['token'] = $shareDocuments->shared_access_token ?? '';

        $companyDetail = CompanyDetail::where('user_id', $user->id)->first();
        $data['companyName'] = '';
        if ($companyDetail) {
            $data['companyName'] = $companyDetail->company_name;
        }

        Notification::route('mail', $data['email'])->notify(new SharedDocumentsEmail($data));

        return back()->with([
            'message' => __('FileStorage/Messages.share.access'),
            'type' => 'success',
        ]);
    }

    public function shareAccessesDestroy(SharedDocument $sharedDocument)
    {
        $sharedDocument->delete();

        return back()->with([
            'message' => __('FileStorage/Messages.share.deleted'),
            'type' => 'success',
        ]);
    }

    public function download($sub_menu_id, $fileName)
    {
        $path = $this->service->getFolderPath($sub_menu_id);
        $filePath = $path.'/'.$fileName;
        $filePath = str_replace('public/', '', $filePath);
        if (! Storage::disk('public')->exists($filePath)) {
            abort(404, 'File not found.');
        }

        return Storage::disk('public')->download($filePath);
    }
}
