<?php

use App\Models\CompanyDetail;
use App\Models\Settings;

if (! function_exists('selectedCompany')) {
    function selectedCompany()
    {
        return CompanyDetail::where(['user_id' => auth()->user()?->id, 'is_selected' => 1])->first();
    }
}

if (! function_exists('getTranslations')) {
    function getTranslations($locale = null): array
    {
        $locale = $locale ?? app()->getLocale();
        $translations = [];
        $directory = new RecursiveDirectoryIterator(resource_path("lang/{$locale}"));
        $iterator = new RecursiveIteratorIterator($directory);

        foreach ($iterator as $file) {
            if ($file->isFile() && $file->getExtension() === 'php') {
                $filename = $iterator->getSubPathname();
                $key = str_replace('.php', '', str_replace(DIRECTORY_SEPARATOR, '.', $filename));
                $translations[$key] = require $file->getPathname();
            }
        }

        return $translations;
    }
}

if (! function_exists('timezone_identifiers')) {
    function timezone_identifiers(): array
    {
        return array_map(function ($timezone) {
            $dateTimeZone = new \DateTimeZone($timezone);
            $offset = $dateTimeZone->getOffset(new \DateTime('now', $dateTimeZone));
            $formattedOffset = sprintf('%s%02d:%02d', $offset >= 0 ? '+' : '-', abs($offset) / 3600, (abs($offset) % 3600) / 60);

            return [
                'label' => "{$timezone}, {$formattedOffset}",
                'value' => $timezone,
            ];
        }, \DateTimeZone::listIdentifiers());
    }
}

if (! function_exists('getSettings')) {
    function getSettings()
    {
        return Settings::first();
    }
}
