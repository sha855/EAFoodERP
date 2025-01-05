<?php

namespace Database\Seeders;

use App\Models\Settings;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

class AdminSettingSeeder extends Seeder
{
    public function run()
    {
        $logosPath = public_path('logos');
        if (File::exists($logosPath)) {
            $files = File::allFiles($logosPath);
            $updateData = [
                'api_token' => 'random-api-token',
            ];

            foreach ($files as $file) {
                $fileName = $file->getFilename();
                $storedFilePath = Storage::disk('public')->putFileAs('logos', $file, $fileName);
                if (strpos($fileName, 'logo') !== false) {
                    $updateData['logo_path'] = $storedFilePath;
                } elseif (strpos($fileName, 'fullLogo') !== false) {
                    $updateData['full_logo_path'] = $storedFilePath;
                } elseif (strpos($fileName, 'favicon') !== false) {
                    $updateData['favicon_path'] = $storedFilePath;
                } elseif (strpos($fileName, 'mobileLogo') !== false) {
                    $updateData['mobile_logo_path'] = $storedFilePath;
                    $updateData['dark_logo_path'] = $storedFilePath;
                }
            }
            Settings::updateOrCreate(
                ['id' => 1],
                $updateData
            );
        } else {
            Log::error('Logos folder not found at ' . $logosPath);
        }
    }

}
