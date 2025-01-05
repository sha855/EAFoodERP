<?php

return [
    'name' => [
        'required' => 'Name is required.',
        'max' => 'Name must not exceed 255 characters.',
    ],
    'email' => [
        'email' => 'Email must be a valid email address.',
    ],
    'password' => [
        'min' => 'Password must be at least 8 characters.',
    ],
    'password_confirmation' => [
        'same' => 'Passwords must match.',
    ],
    'businessType' => [
        'required' => 'Business type is required.',
        'exists' => 'Selected business type does not exist.',
    ],
    'country' => [
        'required' => 'Country is required.',
        'max' => 'Country must not exceed 10 characters.',
    ],
    'state' => [
        'required' => 'State is required.',
        'max' => 'State must not exceed 10 characters.',
    ],
    'totalEmployees' => [
        'required' => 'Total employees field is required.',
        'in' => 'Invalid selection for total employees.',
    ],
    'totalLocations' => [
        'required' => 'Total locations field is required.',
        'in' => 'Invalid selection for total locations.',
    ],
];
