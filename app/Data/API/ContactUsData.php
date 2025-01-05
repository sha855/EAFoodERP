<?php

namespace App\Data\API;

use App\Models\ContactUs;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class ContactUsData extends Data
{
    public function __construct(
        #[Rule('nullable')]
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $firstName,

        #[Rule('required', 'string', 'max:255')]
        public ?string $lastName,

        #[Rule('required', 'string', 'email')]
        public ?string $email,

        #[Rule('required', 'string', 'max:255')]
        public ?string $phoneNumber,

        #[Rule('required', 'string', 'max:255')]
        public ?string $companyName,

        #[Rule('required', 'string', 'max:600')]
        public ?string $description,

    ) {}

    public static function fromModel(ContactUs $model): self
    {
        return new self(
            id          : $model->id,
            firstName   : $model->first_name,
            lastName    : $model->last_name,
            email       : $model->email,
            phoneNumber : $model->phone_number,
            companyName : $model->company_name,
            description : $model->description,
        );
    }

    public static function messages(): array
    {
        return [
            'firstName.required' => __('validation.ContactUs.first_name.required'),
            'firstName.string' => __('validation.ContactUs.first_name.string'),
            'firstName.max' => __('validation.ContactUs.first_name.max'),

            'lastName.required' => __('validation.ContactUs.last_name.required'),
            'lastName.string' => __('validation.ContactUs.last_name.string'),
            'lastName.max' => __('validation.ContactUs.last_name.max'),

            'email.required' => __('validation.ContactUs.email.required'),
            'email.email' => __('validation.ContactUs.email.email'),

            'phoneNumber.required' => __('validation.ContactUs.phone_number.required'),
            'phoneNumber.integer' => __('validation.ContactUs.phone_number.integer'),
            'phoneNumber.digits_between' => __('validation.ContactUs.phone_number.digits_between'),

            'companyName.required' => __('validation.ContactUs.company_name.required'),
            'companyName.string' => __('validation.ContactUs.company_name.string'),
            'companyName.max' => __('validation.ContactUs.company_name.max'),

            'description.required' => __('validation.ContactUs.description.required'),
            'description.string' => __('validation.ContactUs.description.string'),
            'description.max' => __('validation.ContactUs.description.max'),
        ];
    }
}
