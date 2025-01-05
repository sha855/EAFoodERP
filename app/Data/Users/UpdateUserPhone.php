<?php

namespace App\Data\Users;

use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;

class UpdateUserPhone extends Data
{
    public function __construct(
        #[Rule('required', 'string', 'regex:/^\w+$/')]
        public string $country,

        #[Rule('required', 'string', 'regex:/^\+\d+$/')]
        public string $stdcode,

        #[Rule('required', 'string', 'regex:/^\d+(\s\d+)*$/')]
        public string $phone
    ) {}

    public static function messages(): array
    {
        return [
            'country.required' => __('Validation/updateUserPhone.required'),
            'country.regex' => __('Validation/updateUserPhone.regex'),
            'stdcode.required' => __('Validation/updateUserPhone.stdcode.required'),
            'stdcode.regex' => __('Validation/updateUserPhone.stdcode.regex'),
            'phone.required' => __('Validation/updateUserPhone.phone.required'),
            'phone.regex' => __('Validation/updateUserPhone.phone.regex'),
        ];
    }
}
