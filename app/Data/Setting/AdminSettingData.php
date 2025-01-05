<?php

namespace App\Data\Setting;

use App\Models\Setting;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Symfony\Component\HttpFoundation\File\UploadedFile;

#[MapName(SnakeCaseMapper::class)]
class AdminSettingData extends Data
{
    public function __construct(

        public ?int $id,

        #[Rule('required', 'string')]
        public string $apiToken,

        #[Rule('nullable', 'file', 'mimes:jpeg,png,svg,jpg,ico', 'max:2048')]
        public ?UploadedFile $logo,

        #[Rule('nullable', 'file', 'mimes:jpeg,png,svg,jpg,ico', 'max:2048')]
        public ?UploadedFile $fullLogo,

        #[Rule('nullable', 'file', 'mimes:jpeg,png,svg,jpg,ico', 'max:2048')]
        public ?UploadedFile $favicon,

        #[Rule('nullable', 'file', 'mimes:jpeg,png,svg,jpg,ico', 'max:2048')]
        public ?UploadedFile $mobileLogo,

        #[Rule('nullable', 'file', 'mimes:jpeg,png,svg,jpg,ico', 'max:2048')]
        public ?UploadedFile $darkLogo
    ) {}

    public static function fromModel(Setting $setting): self
    {
        return new self(
            id: $setting->id,
            apiToken: $setting->api_token,
            logo: $setting->logo,
            fullLogo: $setting->fullLogo,
            favicon: $setting->favicon,
            mobileLogo: $setting->mobileLogo,
            darkLogo: $setting->darkLogo,
        );
    }

    public static function messages(): array
    {
        return [
            'apiToken.required' => __('Validation/AdminSetting.apiToken.required'),
            'logo.mimes' => __('Validation/AdminSetting.logo.mimes'),
            'fullLogo.mimes' => __('Validation/AdminSetting.fullLogo.mimes'),
            'favicon.mimes' => __('Validation/AdminSetting.favicon.mimes'),
            'mobileLogo.mimes' => __('Validation/AdminSetting.mobileLogo.mimes'),
            'darkLogo.mimes' => __('Validation/AdminSetting.darkLogo.mimes'),
        ];
    }
}
