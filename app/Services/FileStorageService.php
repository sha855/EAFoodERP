<?php

namespace App\Services;

use App\Data\FileStorage\FileStorageData;
use App\Models\CompanyDetail;
use App\Models\ManageFolder;
use App\Models\SharedDocument;
use App\Models\SubManageFile;
use App\Repositories\ManageFolderRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class FileStorageService
{
    public function __construct(
        protected ManageFolderRepository $repository,
    ) {}

    public function updateOrCreate(FileStorageData $data, ?SubManageFile $subManageFile = null): SubManageFile
    {
        $fileData = $data->toArray();
        $file = $fileData['file'];
        $folderPath = $this->getFolderPath($fileData['sub_menu_id']);

        if ($fileData['id'] && $subManageFile && $subManageFile['file']) {
            Storage::disk()->delete($subManageFile['file']);
        }

        Storage::makeDirectory($folderPath, 0777, true);
        if ($file->getClientOriginalExtension() === 'zip') {
            return $this->processZipFile($file, $folderPath, $fileData['sub_menu_id'], $data->companyId);
        }

        $fileData['name'] = $file->getClientOriginalName();
        $file_path = $file->storeAs($folderPath, $fileData['name']);
        $fileData['file'] = $file_path;

        return SubManageFile::updateOrCreate(
            ['id' => $fileData['id'] ?? null],
            $fileData
        );
    }

    private function processZipFile($zipFile, string $folderPath, int $parentFolderId, $companyId): SubManageFile
    {
        $timestamp = time();
        $tempFolderPath = "temp/{$timestamp}";
        $zipPath = $zipFile->storeAs('temp', "{$timestamp}.zip");
        $zipFullPath = storage_path("app/{$zipPath}");

        $zip = new \ZipArchive;
        if ($zip->open($zipFullPath) === true) {
            $zip->extractTo(storage_path("app/{$tempFolderPath}"));
            $zip->close();
        } else {
            throw new \Exception('Unable to open zip file.');
        }

        $this->processDirectory(storage_path("app/{$tempFolderPath}"), $parentFolderId, $companyId);

        Storage::delete($zipPath);
        Storage::deleteDirectory($tempFolderPath);

        return SubManageFile::where('sub_menu_id', $parentFolderId)->firstOrNew();
    }

    private function processDirectory(string $directory, int $parentId, $companyId): void
    {
        $allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];
        $items = scandir($directory);

        foreach ($items as $item) {
            if ($item === '.' || $item === '..') {
                continue;
            }

            $itemPath = "{$directory}/{$item}";
            if (is_file($itemPath)) {
                $extension = strtolower(pathinfo($itemPath, PATHINFO_EXTENSION));
                if (in_array($extension, $allowedExtensions)) {
                    $filename = pathinfo($itemPath, PATHINFO_FILENAME);
                    $fileRelPath = "uploads/{$filename}";

                    Storage::put("public/{$fileRelPath}", file_get_contents($itemPath));

                    SubManageFile::create([
                        'sub_menu_id' => $parentId,
                        'name' => $filename,
                        'file' => "public/{$fileRelPath}",
                    ]);
                }
            } elseif (is_dir($itemPath)) {

                $folder = ManageFolder::create([
                    'menu' => $item,
                    'parent_id' => $parentId,
                    'user_id' => Auth::id(),
                    'company_id' => $companyId ?? selectedCompany()->id,
                ]);
                $this->processDirectory($itemPath, $folder->id, $companyId);
            }
        }
    }

    public function getFolderPath(int $subMenuId): string
    {
        $folder = ManageFolder::findOrFail($subMenuId);
        $pathArr = [];

        while ($folder) {
            $pathArr[] = $folder->menu;
            $folder = $folder->parent_id ? ManageFolder::find($folder->parent_id) : null;
        }

        $pathArr = array_reverse($pathArr);

        return 'public/uploads/folders/'.implode('/', $pathArr);
    }

    public function deleteFolder(int $id): void
    {
        $folder = ManageFolder::findOrFail($id);
        $folderPath = $this->getFolderPath($id);

        if (Storage::exists($folderPath)) {
            Storage::deleteDirectory($folderPath);
        }

        $this->deleteSubfolders($id);
        $folder->delete();
    }

    private function deleteSubfolders(int $parentId): void
    {
        $subfolders = ManageFolder::where('parent_id', $parentId)->get();

        foreach ($subfolders as $subfolder) {
            $subfolderPath = $this->getFolderPath($subfolder->id);
            if (Storage::exists($subfolderPath)) {
                Storage::deleteDirectory($subfolderPath);
            }

            $this->deleteSubfolders($subfolder->id);
            $subfolder->delete();
        }
    }

    public function updateFolder(int $id, array $data): ManageFolder
    {
        $folder = ManageFolder::findOrFail($id);
        $folder->update($data);

        return $folder;
    }

    public function addFolder(array $data): ManageFolder
    {
        $selectedCompany = selectedCompany()?->id;
        if (! empty($data['company_id'])) {
            $selectedCompany = $data['company_id'];
        }
        $company = CompanyDetail::where('id', $selectedCompany)->first();

        $data['user_id'] = $company?->user_id ?? auth()->user()->id;
        $data['company_id'] = $selectedCompany;

        return ManageFolder::create($data);
    }

    public function shareDocuments($data): SharedDocument
    {
        $sharedDocumentData = $data->toArray();
        $companyDetail = CompanyDetail::where('id', selectedCompany()->id ?? $data->companyId)->first();
        $sharedDocumentData['user_id'] = $companyDetail->user_id;
        if ($companyDetail) {
            $sharedDocumentData['company_id'] = $companyDetail->id;
        }

        do {
            $token = Str::random(20);
        } while (SharedDocument::where('shared_access_token', $token)->exists());

        $sharedDocumentData['shared_access_token'] = $token;

        return SharedDocument::create($sharedDocumentData);
    }

    public function destroySubManageFile(SubManageFile $subManageFile): bool
    {
        Storage::disk()->delete($subManageFile['file']);

        return $subManageFile->delete();
    }
}
