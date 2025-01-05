<?php

namespace App\Repositories;

use App\Models\Settings;
use Illuminate\Support\Facades\Storage;

class SettingRepository
{
    public function getSettingData()
    {
        $setting = Settings::first();

        if ($setting) {
            $setting->logo_path = $setting->logo_path ? Storage::url($setting->logo_path) : null;
            $setting->full_logo_path = $setting->full_logo_path ? Storage::url($setting->full_logo_path) : null;
            $setting->favicon_path = $setting->favicon_path ? Storage::url($setting->favicon_path) : null;
            $setting->mobile_logo_path = $setting->mobile_logo_path ? Storage::url($setting->mobile_logo_path) : null;
            $setting->dark_logo_path = $setting->dark_logo_path ? Storage::url($setting->dark_logo_path) : null;
        }

        return $setting;
    }

    public function getToken()
    {
        $token = Settings::query()->value('api_token');
        return $token;
    }
}
