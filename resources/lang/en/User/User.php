<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],

    'name' => [
        'required' => 'User name is required.',
        'string' => 'User name must be a string.',
    ],
    'email' => [
        'required' => 'Email is required.',
        'string' => 'Email must be a string.',
        'email' => 'Email must be a valid email address.',
    ],
    'std_code' => [
        'required' => 'Standard code is required.',
        'string' => 'Standard code must be a string.',
        'regex' => 'Standard code must start with a + followed by digits.',
    ],
    'phone_no' => [
        'required' => 'Phone number is required.',
        'string' => 'Phone number must be a string.',
        'regex' => 'Phone number must be in a valid format.',
    ],
    'password' => [
        'required' => 'Password is required.',
        'min' => 'Password must be at least 8 characters.',
        'string' => 'Password must be a string.',
    ],
    'confirm_password' => [
        'required' => 'Confirm password is required.',
        'min' => 'Confirm password must be at least 8 characters.',
        'string' => 'Confirm password must be a string.',
        'same' => 'Password and confirm password must be same.',
    ],
];
