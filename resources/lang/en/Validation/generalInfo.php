<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],
    'company_name' => [
        'required' => 'Company Name is required.',
        'string' => 'Company Name must be a string.',
        'max' => 'Company Name may not be greater than 255 characters.',
    ],
    'company_registration_number' => [
        'required' => 'Company Register Number is required.',
        'string' => 'Company Register Number must be a string.',
        'max' => 'Company Register Number may not be greater than 255 characters.',
    ],
    'address' => [
        'required' => 'Address is required.',
        'string' => 'Address must be a string.',
        'max' => 'Address may not be greater than 255 characters.',
    ],
    'unit_name' => [
        'required' => 'Business Unit Name is required.',
        'string' => 'Business Unit Name must be a string.',
        'max' => 'Business Unit Name may not be greater than 255 characters.',
    ],
    'phone' => [
        'required' => 'Phone number is required.',
        'string' => 'Phone number must be a string.',
        'max' => 'Phone number may not be greater than 20 characters.',
    ],
    'email' => [
        'required' => 'Email is required.',
        'email' => 'Email must be a valid email address.',
    ],
    'manager' => [
        'required' => 'Manager Name is required.',
        'string' => 'Manager Name must be a string.',
        'max' => 'Manager Name may not be greater than 255 characters.',
    ],
    'food_business_unit_id' => [
        'required' => 'Food Business type is requires.',
        'string' => 'Food Business must be an string',
    ],
    'business_unit_is' => [
        'required' => 'Food Business Type is required.',
        'string' => 'Food Business Type must be a string.',
    ],
    'additional_business_activity_id' => [
        'required' => 'Additional Business Activities is required.',
        'string' => 'Additional Business Activities must be a string.',
    ],
    'organic' => [
        'boolean' => 'Organic must be a boolean value.',
    ],
    'customer_group_id' => [
        'required' => 'Main Customer Group is required.',
        'string' => 'Main Customer Group must be a string.',
    ],
    'number_of_seats' => [
        'required' => 'Number of Seats is required.',
        'integer' => 'Number of Seats must be an integer.',
    ],
];
