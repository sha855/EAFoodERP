<?php

namespace App\Data\Users;

use App\Models\User;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CreateCompanyUserData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string')]
        public string $name,

        #[Rule('required', 'string', 'email', 'unique:users,email')]
        public string $email,

        #[Rule('required', 'string', 'regex:/^\+\d+(-\d+)*$/')]
        public string $stdCode,

        #[Rule('required', 'string', 'regex:/^\d+(\s\d+)*$/')]
        public string $phoneNo,

        #[Rule('required', 'string', 'max:255')]
        public string $companyName,

        #[Rule('required', 'integer', 'exists:food_business_types,id')]
        public int $businessTypeId,

        #[Rule('required', 'string', 'max:10')]
        public string $countryName,

        #[Rule('required', 'string', 'max:10')]
        public string $state,

        #[Rule('required', 'string', 'in:1-10,11-50,51-200,200+')]
        public string $totalNoOfEmployees,

        #[Rule('required', 'string', 'in:1-5,6-20,21-50,50+')]
        public string $totalNoOfBusinessLocations,

        #[Rule('required', 'string', 'min:8')]
        public string $password,

        #[Rule('required', 'string', 'same:password')]
        public string $passwordConfirmation

    ) {}

    public static function fromModel(User $user): self
    {
        return new self(
            id: $user->id,
            name: $user->name,
            email: $user->email,
            stdCode: $user->std_code,
            phoneNo: $user->phone_no,
            companyName : $user->companyDetail->company_name,
            businessTypeId : $user->companyDetail->business_type_id,
            countryName : $user->companyDetail->country_name,
            state : $user->companyDetail->state,
            totalNoOfEmployees : $user->companyDetail->total_no_of_employees,
            totalNoOfBusinessLocations: $user->companyDetail->total_no_of_business_locations,
            password: $user->companyDetail->password,
            passwordConfirmation: $user->companyDetail->passwordConfirmation,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('User/User.id.integer'),
            'name.required' => __('User/User.name.required'),
            'name.string' => __('User/User.name.string'),
            'email.required' => __('User/User.email.required'),
            'email.string' => __('User/User.email.string'),
            'email.email' => __('User/User.email.email'),
            'std_code.required' => __('User/User.std_code.required'),
            'std_code.regex' => __('User/User.std_code.regex'),
            'phone_no.required' => __('User/User.phone_no.required'),
            'phone_no.regex' => __('User/User.phone_no.regex'),
            'companyName.required' => __('Validation/companyRegistration.name.required'),
            'companyName.max' => __('Validation/companyRegistration.name.max'),
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

            'password.required' => __('User/User.password.required'),
            'password.min' => __('User/User.password.min'),
            'password.string' => __('User/User.password.string'),
            'confirm_password.required' => __('User/User.confirm_password.required'),
            'confirm_password.string' => __('User/User.confirm_password.string'),
            'confirm_password.same' => __('User/User.confirm_password.same'),
        ];
    }
}
