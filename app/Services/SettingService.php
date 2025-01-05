<?php

namespace App\Services;

use App\Data\Setting\AdminSettingData;
use App\Models\Settings;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class SettingService
{
    public function createOrUpdateAdminSetting(AdminSettingData $data)
    {
        $currentSetting = Settings::find($data->id);
        $updateData = [
            'api_token' => $data->apiToken,
        ];
        if ($data->logo) {
            if ($currentSetting && $currentSetting->logo_path) {
                Storage::disk('public')->delete($currentSetting->logo_path);
            }
            $updateData['logo_path'] = $data->logo->store('logos', 'public');
        }

        if ($data->fullLogo) {
            if ($currentSetting && $currentSetting->full_logo_path) {
                Storage::disk('public')->delete($currentSetting->full_logo_path);
            }
            $updateData['full_logo_path'] = $data->fullLogo->store('logos', 'public');
        }

        if ($data->favicon) {
            if ($currentSetting && $currentSetting->favicon_path) {
                Storage::disk('public')->delete($currentSetting->favicon_path);
            }
            $updateData['favicon_path'] = $data->favicon->store('logos', 'public');
        }
        if ($data->mobileLogo) {
            if ($currentSetting && $currentSetting->mobile_logo_path) {
                Storage::disk('public')->delete($currentSetting->mobile_logo_path);
            }
            $updateData['mobile_logo_path'] = $data->mobileLogo->store('logos', 'public');
        }
        if ($data->darkLogo) {
            if ($currentSetting && $currentSetting->dark_logo_path) {
                Storage::disk('public')->delete($currentSetting->dark_logo_path);
            }
            $updateData['dark_logo_path'] = $data->darkLogo->store('logos', 'public');
        }
        Settings::updateOrCreate(
            ['id' => $data->id],
            $updateData
        );
    }

    public function clearCache(): int
    {
        return Artisan::call('optimize:clear');
    }

    public function storageLink(): int
    {
        return Artisan::call('storage:link');
    }
}
