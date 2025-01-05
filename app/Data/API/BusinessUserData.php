<?php

namespace App\Data\API;

use App\Models\BusinessUser;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class BusinessUserData extends Data
{
    public function __construct(
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $fullName,

        #[Rule('required', 'string', 'max:255')]
        public string $companyName,

        #[Rule('nullable', 'email')]
        public ?string $workEmail,

        #[Rule('required', 'string', 'exists:food_business_types,name')]
        public string $businessTypeName,

        #[Rule('required', 'string', 'in:1-10,11-50,51-200,201-500,501+')]
        public string $totalNoOfEmployees,

        #[Rule('required', 'string', 'regex:/^\+\d+$/')]
        public string $stdcode,

        #[Rule('required', 'string', 'regex:/^\d+(\s\d+)*$/')]
        public string $phone,

        #[Rule('nullable', 'string')]
        public ?string $documentUrl = null
    ) {}

    public static function messages(): array
    {
        return [
            'fullName.required' => __('User/User.name.required'),
            'fullName.string' => __('User/User.name.string'),
            'companyName.required' => __('Validation/companyRegistration.name.required'),
            'companyName.max' => __('Validation/companyRegistration.name.max'),
            'workEmail.email' => __('Validation/companyRegistration.email.email'),
            'businessTypeName.required' => __('Validation/companyRegistration.businessType.required'),
            'businessTypeName.exists' => __('Validation/companyRegistration.businessType.exists'),
            'totalNoOfEmployees.required' => __('Validation/companyRegistration.totalEmployees.required'),
            'totalNoOfEmployees.in' => __('Validation/companyRegistration.totalEmployees.in'),
            'stdcode.required' => __('Validation/updateUserPhone.stdcode.required'),
            'stdcode.regex' => __('Validation/updateUserPhone.stdcode.regex'),
            'phone.required' => __('Validation/updateUserPhone.phone.required'),
            'phone.regex' => __('Validation/updateUserPhone.phone.regex'),
        ];
    }

    public static function fromModel(BusinessUser $model): self
    {
        return new self(
            id  : $model->id,
            fullName : $model->full_name,
            companyName: $model->company_name,
            workEmail: $model->work_email,
            businessTypeName: $model->business_type_name,
            totalNoOfEmployees: $model->total_number_of_employees,
            stdcode: $model->std_code,
            phone: $model->phone,
            documentUrl : $model->document_url,
        );
    }
}
