<?php

namespace App\Data\Company;

use App\Models\CompanyDetail;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class CompanyRegistration extends Data
{
    public function __construct(

        #[Rule('required', 'integer')]
        public ?int $userId,

        #[Rule('required', 'string', 'max:255')]
        public string $companyName,

        #[Rule('nullable', 'email', 'max:255')]
        public ?string $email,

        #[Rule('nullable', 'string', 'min:8')]
        public ?string $password,

        #[Rule('nullable', 'string', 'min:8', 'same:password')]
        public ?string $passwordConfirmation,

        #[Rule('required', 'integer', 'exists:food_business_types,id')]
        public int $businessTypeId,

        #[Rule('required', 'string', 'max:10')]
        public string $countryName,

        #[Rule('required', 'string', 'max:10')]
        public string $state,

        #[Rule('required', 'string', 'in:1-10,11-50,51-200,200+')]
        public string $totalNoOfEmployees,

        #[Rule('required', 'string', 'in:1-5,6-20,21-50,50+')]
        public string $totalNoOfBusinessLocations
    ) {}

    public static function messages(): array
    {
        return [
            'companyName.required' => __('Validation/companyRegistration.name.required'),
            'companyName.max' => __('Validation/companyRegistration.name.max'),
            'email.email' => __('Validation/companyRegistration.email.email'),
            'password.min' => __('Validation/companyRegistration.password.min'),
            'passwordConfirmation.same' => __('Validation/companyRegistration.password_confirmation.same'),
            'businessTypeId.required' => __('Validation/companyRegistration.businessType.required'),
            'businessTypeId.exists' => __('Validation/companyRegistration.businessType.exists'),
            'countryName.required' => __('Validation/companyRegistration.country.required'),
            'countryName.max' => __('Validation/companyRegistration.country.max'),
            'state.required' => __('Validation/companyRegistration.state.required'),
            'state.max' => __('Validation/companyRegistration.state.max'),
            'totalNoOfEmployees.required' => __('Validation/companyRegistration.totalEmployees.required'),
            'totalNoOfEmployees.in' => __('Validation/companyRegistration.totalEmployees.in'),
            'totalNoOfBusinessLocations.required' => __('Validation/companyRegistration.totalLocations.required'),
            'totalNoOfBusinessLocations.in' => __('Validation/companyRegistration.totalLocations.in'),
        ];
    }

    public static function fromModel(CompanyDetail $model): self
    {
        return new self(
            userId  : $model->user_id,
            companyName: $model->company_name,
            email: $model->email,
            password: null,
            passwordConfirmation: null,
            businessTypeId: $model->business_type_id,
            countryName: $model->country_name,
            state: $model->state,
            totalNoOfEmployees: $model->total_no_of_employees,
            totalNoOfBusinessLocations: $model->total_no_of_business_locations,
        );
    }
}
