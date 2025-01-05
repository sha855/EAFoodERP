<?php

namespace App\Data\Setup;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class BusinessUnitData extends Data
{
    public function __construct(
        #[Rule('required|string|max:255')]
        public string $companyName,

        #[Rule('required|string')]
        public string $address,

        #[Rule('required|string|max:255')]
        public string $countryName,

        #[Rule('nullable|string|max:20')]
        public ?string $phone,

        #[Rule('required|email|max:255')]
        public string $email,

        #[Rule('nullable|email|max:255')]
        public ?string $workEmailForNotification = null,

        #[Rule('nullable|string|max:255')]
        public ?string $representativePerson = null,

        #[Rule('nullable|integer|max:255')]
        public ?int $businessTypeId = null,

        #[Rule('nullable|string|max:255')]
        public ?string $totalNoOfBusinessLocations = null,

        #[Rule('nullable|string|min:1')]
        public ?string $totalNoOfEmployees = null,

        #[Rule('nullable|string|max:255')]
        public ?string $preferredLanguage = null,

        #[Rule('nullable|string|max:255')]
        public ?string $timeZone = null

    ) {}

    public static function messages(): array
    {
        return [
            'companyName.required' => __('Validation/BusinessUnit.company.companyName.required'),
            'companyName.string' => __('Validation/BusinessUnit.company.companyName.string'),
            'companyName.max' => __('Validation/BusinessUnit.company.companyName.max'),

            'address.required' => __('Validation/BusinessUnit.company.address.required'),
            'address.string' => __('Validation/BusinessUnit.company.address.string'),
            'address.max' => __('Validation/BusinessUnit.company.address.max'),

            'countryName.required' => __('Validation/BusinessUnit.company.countryName.required'),
            'countryName.string' => __('Validation/BusinessUnit.company.countryName.string'),
            'countryName.max' => __('Validation/BusinessUnit.company.countryName.max'),

            'phone.string' => __('Validation/BusinessUnit.company.phone.string'),
            'phone.max' => __('Validation/BusinessUnit.company.phone.max'),

            'workEmailForNotification.email' => __('Validation/BusinessUnit.company.workEmailForNotification.email'),
            'workEmailForNotification.max' => __('Validation/BusinessUnit.company.workEmailForNotification.max'),

            'representativePerson.email' => __('Validation/BusinessUnit.company.representativePerson.email'),
            'representativePerson.max' => __('Validation/BusinessUnit.company.representativePerson.max'),

            'email.email' => __('Validation/BusinessUnit.company.email.email'),
            'email.max' => __('Validation/BusinessUnit.company.email.max'),

            'businessTypeId.integer' => __('Validation/BusinessUnit.company.businessTypeId.integer'),
            'businessTypeId.max' => __('Validation/BusinessUnit.company.businessTypeId.max'),

            'totalNoOfBusinessLocations.string' => __('Validation/BusinessUnit.company.totalNoOfBusinessLocations.string'),
            'totalNoOfBusinessLocations.max' => __('Validation/BusinessUnit.company.totalNoOfBusinessLocations.max'),

            'totalNoOfEmployees.string' => __('Validation/BusinessUnit.company.totalNoOfEmployees.string'),
            'totalNoOfEmployees.min' => __('Validation/BusinessUnit.company.totalNoOfEmployees.min'),

            'preferredLanguage.string' => __('Validation/BusinessUnit.company.preferredLanguage.string'),
            'preferredLanguage.max' => __('Validation/BusinessUnit.company.preferredLanguage.max'),

            'timeZone.string' => __('Validation/BusinessUnit.company.timeZone.string'),
            'timeZone.max' => __('Validation/BusinessUnit.company.timeZone.max'),

        ];
    }
}
