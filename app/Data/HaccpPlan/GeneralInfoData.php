<?php

namespace App\Data\HaccpPlan;

use App\Models\BusinessUnit;
use App\Models\CompanyDetail;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class GeneralInfoData extends Data
{
    public function __construct(

        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('nullable', 'integer', 'max:10')]
        public ?int $businessUnitId,

        #[Rule('required', 'string', 'max:255')]
        public string $companyName,

        #[Rule('required', 'string', 'max:255')]
        public string $companyRegistrationNumber,

        #[Rule('required', 'string', 'max:255')]
        public string $address,

        #[Rule('required', 'string', 'max:255')]
        public string $businessUnitAddress,

        #[Rule('required', 'string', 'max:255')]
        public string $unitName,

        #[Rule('required', 'string', 'regex:/^\+?[0-9\s\-\(\)]+$/')]
        public string $phone,

        #[Rule('required', 'email')]
        public string $email,

        #[Rule('required', 'string', 'max:255')]
        public string $manager,

        #[Rule('required', 'string')]
        public ?string $foodBusinessUnitId,

        #[Rule('nullable')]
        public ?array $additionalBusinessActivityId,

        #[Rule('required', 'integer')]
        public ?int $foodBusinessTypeId,

        #[Rule('required', 'string')]
        public string $customerGroupId,

        #[Rule('required', 'integer')]
        public int $numberOfSeats,

        #[Rule('nullable', 'boolean')]
        public ?bool $isOrganic = false,

        #[Rule('nullable', 'boolean')]
        public ?bool $isTerrace = false,

        #[Rule('nullable', 'string')]
        public ?string $customBusinessUnit = '',

        #[Rule('nullable', 'string')]
        public ?string $customCustomerGroup = '',
    ) {}

    public static function messages(): array
    {
        return [
            'id.integer' => __('Validation/generalInfo.id.integer'),

            'company_name.required' => __('Validation/generalInfo.company_name.required'),
            'company_name.string' => __('Validation/generalInfo.company_name.string'),
            'company_name.max' => __('Validation/generalInfo.company_name.max'),

            'company_registration_number.required' => __('Validation/generalInfo.company_registration_number.required'),
            'company_registration_number.string' => __('Validation/generalInfo.company_registration_number.string'),
            'company_registration_number.max' => __('Validation/generalInfo.company_registration_number.max'),

            'address.required' => __('Validation/generalInfo.address.required'),
            'address.string' => __('Validation/generalInfo.address.string'),
            'address.max' => __('Validation/generalInfo.address.max'),

            'unit_name.required' => __('Validation/generalInfo.unit_name.required'),
            'unit_name.string' => __('Validation/generalInfo.unit_name.string'),
            'unit_name.max' => __('Validation/generalInfo.unit_name.max'),

            'phone.required' => __('Validation/generalInfo.phone.required'),
            'phone.string' => __('Validation/generalInfo.phone.string'),
            'phone.max' => __('Validation/generalInfo.phone.max'),

            'email.required' => __('Validation/generalInfo.email.required'),
            'email.email' => __('Validation/generalInfo.email.email'),

            'manager.required' => __('Validation/generalInfo.manager.required'),
            'manager.string' => __('Validation/generalInfo.manager.string'),
            'manager.max' => __('Validation/generalInfo.manager.max'),

            'food_business_unit_id.required' => __('Validation/generalInfo.food_business_unit_id.required'),
            'food_business_unit_id.integer' => __('Validation/generalInfo.food_business_unit_id.integer'),

            'business_unit_is.required' => __('Validation/generalInfo.business_unit_is.required'),
            'business_unit_is.string' => __('Validation/generalInfo.business_unit_is.string'),

            'additional_business_activity_id.required' => __('Validation/generalInfo.additional_business_activity_id.required'),

            'organic.boolean' => __('Validation/generalInfo.organic.boolean'),

            'customer_group_id.required' => __('Validation/generalInfo.customer_group_id.required'),
            'customer_group_id.string' => __('Validation/generalInfo.customer_group_id.string'),

            'number_of_seats.required' => __('Validation/generalInfo.number_of_seats.required'),
            'number_of_seats.integer' => __('Validation/generalInfo.number_of_seats.integer'),
        ];
    }

    public static function fromModel(CompanyDetail $companyDetail, BusinessUnit $businessUnit): static
    {
        return new static(
            id: $companyDetail->id,
            businessUnitId: $businessUnit->id,
            companyName: $companyDetail->company_name,
            companyRegistrationNumber: $companyDetail->company_registration_number,
            address: $companyDetail->address,
            businessUnitAddress : $companyDetail->businessUnit->address,
            unitName: $businessUnit->unit_name,
            phone: $companyDetail->phone,
            email: $companyDetail->email,
            manager: $companyDetail->manager,
            foodBusinessUnitId: $companyDetail->food_business_unit_id,
            additionalBusinessActivityId: $companyDetail->additional_business_activity_id,
            foodBusinessTypeId: $companyDetail->food_business_type_id,
            customerGroupId: $businessUnit->customer_group_id,
            numberOfSeats: $companyDetail->number_of_seats,
            isOrganic: $companyDetail->is_organic,
        );
    }
}
