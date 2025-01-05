<?php

namespace App\Data\Setup;

use App\Models\CompanyDetail;
use Illuminate\Validation\Rule as ValidationRule;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class CompanySetup extends Data
{
    public function __construct(

        public ?int $id,

        public ?int $userId,

        #[Rule('required', 'string', 'max:255')]
        public string $companyName,

        #[Rule('required', 'string', 'max:255')]
        public string $countryName,

        #[Rule('required', 'email', 'max:255')]
        public string $email,

        #[Rule('required', 'string', 'max:255')]
        public string $registrationNumber,

        #[Rule('nullable', 'string', 'max:255')]
        public ?string $vatNo,

        #[Rule('required', 'string', 'max:255')]
        public string $address,

        #[Rule('required', 'string', 'max:255')]
        public string $preferredLanguage,

        #[Rule('required', 'string', 'max:50')]
        public string $volumeUnits,

        #[Rule('required', 'string', 'max:50')]
        public string $weightUnits,

        #[Rule('required', 'string', 'max:50')]
        public string $temperatureUnit,

        #[Rule('required', 'string', 'max:50')]
        public string $monitoring,

        #[Rule('required', 'string', 'max:50')]
        public string $temperaturePrefill,

        #[Rule('required', 'string', 'max:20')]
        public string $dateFormat,

        #[Rule('required', 'integer')]
        public int $businessTypeId
    ) {}

    public static function fromModel(CompanyDetail $model): self
    {
        return new self(
            id : $model->id,
            userId: $model->user_id,
            companyName: $model->company_name,
            countryName: $model->country_name,
            email: $model->email,
            registrationNumber: $model->registration_number,
            vatNo: $model->vat_no,
            address: $model->address,
            preferredLanguage: $model->preferred_language,
            volumeUnits: $model->volume_units,
            weightUnits: $model->volume_units,
            temperatureUnit: $model->temperature_unit,
            monitoring: $model->monitoring,
            temperaturePrefill: $model->temperature_prefill,
            dateFormat: $model->date_format,
            businessTypeId: $model->business_type_id,
        );
    }

    public static function rules(): array
    {
        return [
            'company_name' => [
                'required',
                ValidationRule::unique('company_details')->ignore(request('id')),
            ],
        ];
    }

    public static function messages(): array
    {
        return [
            'company_name.required' => 'Company name is required.',
            'company_name.max' => 'Company name must not exceed 255 characters.',
            'country_name.required' => 'Country name is required.',
            'country_name.max' => 'Country name must not exceed 255 characters.',
            'registration_number.required' => 'Registration number is required.',
            'registration_number.max' => 'Registration number must not exceed 255 characters.',
            'vat_no.required' => 'vat is required.',
            'vat_no.max' => 'VAT number must not exceed 255 characters.',
            'email.required' => 'Email is required.',
            'email.max' => 'Email should be mail format.',
            'address.required' => 'Address is required.',
            'address.max' => 'Address must not exceed 255 characters.',
            'preferred_language.required' => 'Preferred language is required.',
            'preferred_language.max' => 'Preferred language must not exceed 255 characters.',
            'volume_units.required' => 'Volume units are required.',
            'volume_units.max' => 'Volume units must not exceed 50 characters.',
            'weight_units.required' => 'Weight units are required.',
            'weight_units.max' => 'Weight units must not exceed 50 characters.',
            'temperature_unit.required' => 'Temperature unit is required.',
            'temperature_unit.max' => 'Temperature unit must not exceed 50 characters.',
            'monitoring.required' => 'Monitoring field is required.',
            'monitoring.max' => 'Monitoring field must not exceed 50 characters.',
            'temperature_prefill.required' => 'Temperature prefill is required.',
            'temperature_prefill.max' => 'Temperature prefill must not exceed 50 characters.',
            'date_format.required' => 'Date format is required.',
            'date_format.max' => 'Date format must not exceed 20 characters.',
        ];
    }
}
