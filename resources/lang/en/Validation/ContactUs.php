<?php

return [

    'attributes' => [
        'first_name' => 'first name',
        'last_name' => 'last name',
        'email' => 'email',
        'phone_number' => 'phone number',
        'company_name' => 'company name',
        'description' => 'description',
    ],

    'custom' => [
        'first_name' => [
            'required' => 'The :attribute is required.',
            'string' => 'The :attribute must be a valid string.',
            'max' => 'The :attribute cannot be longer than :max characters.',
        ],
        'last_name' => [
            'required' => 'The :attribute is required.',
            'string' => 'The :attribute must be a valid string.',
            'max' => 'The :attribute cannot be longer than :max characters.',
        ],
        'email' => [
            'required' => 'The :attribute is required.',
            'email' => 'The :attribute must be a valid email address.',
        ],
        'phone_number' => [
            'required' => 'The :attribute is required.',
            'integer' => 'The :attribute must be a valid number.',
            'max' => 'The :attribute cannot be longer than :max digits.',
        ],
        'company_name' => [
            'required' => 'The :attribute is required.',
            'string' => 'The :attribute must be a valid string.',
            'max' => 'The :attribute cannot be longer than :max characters.',
        ],
        'description' => [
            'required' => 'The :attribute is required.',
            'string' => 'The :attribute must be a valid string.',
            'max' => 'The :attribute cannot be longer than :max characters.',
        ],
    ],
];
