<?php

namespace App\Repositories;

use App\Models\CompanyDetail;
use App\Models\ManageFolder;
use App\Models\SharedDocument;
use App\Models\SubManageFile;
use Illuminate\Pagination\LengthAwarePaginator;

class ManageFolderRepository
{
    public function getFolders(?CompanyDetail $company = null)
    {
        $selectedCompany = $company?->id ?? selectedCompany()?->id;

        return ManageFolder::where('company_id', $selectedCompany)
            ->orderByDesc('id')
            ->get()
            ->map(fn($folder) => ['slug' => $folder->slug] + $folder->toArray());

    }

    public function getSharedDocuments(?CompanyDetail $company = null, int $perPage = 10): LengthAwarePaginator
    {
        $selectedCompany = $company?->id ?? selectedCompany()?->id;

        return SharedDocument::where('company_id', $selectedCompany)
            ->orderByDesc('id')
            ->paginate($perPage);
    }

    public function getSubFolderFiles(int $perPage, int $id): LengthAwarePaginator
    {
        return SubManageFile::where('sub_menu_id', $id)->orderByDesc('id')->paginate($perPage);
    }

    public function getSubFolder(int $id)
    {
        return ManageFolder::select('menu')->where('id', $id)->first()->toArray();
    }
}
