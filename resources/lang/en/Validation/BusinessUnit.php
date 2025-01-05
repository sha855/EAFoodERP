<?php

return [
    'company' => [
        'companyName' => [
            'required' => 'The unit name is required.',
            'string' => 'The unit name must be a string.',
            'max' => 'The company name must not exceed 255 characters.',
        ],

        'address' => [
            'required' => 'The address is required.',
            'string' => 'The address must be a string.',
            'max' => 'The address must not exceed 255 characters.',
        ],

        'countryName' => [
            'required' => 'The country name is required.',
            'string' => 'The country name must be a string.',
            'max' => 'The country name must not exceed 100 characters.',
        ],

        'phone' => [
            'string' => 'The phone number must be a string.',
            'max' => 'The phone number must not exceed 20 characters.',
        ],

        'email' => [
            'email' => 'The email must be a valid email address.',
            'max' => 'The email must not exceed 255 characters.',
        ],

        'workEmailForNotification' => [
            'email' => 'The email must be a valid email address.',
            'max' => 'The email must not exceed 255 characters.',
        ],

        'representativePerson' => [
            'string' => 'The representative person must be a string.',
            'max' => 'The email must not exceed 255 characters.',
        ],

        'businessTypeId' => [
            'integer' => 'Business type must be an integer.',
            'max' => 'The business type ID must not exceed 255 characters.',
        ],

        'totalNoOfBusinessLocations' => [
            'string' => 'The number of locations must be a string.',
            'max' => 'The number of locations must not exceed 100 characters.',
        ],

        'totalNoOfEmployees' => [
            'string' => 'The number of employees must be a string.',
            'min' => 'The number of employees must be at least 1.',
        ],

        'preferredLanguage' => [
            'string' => 'The preferred language must be a string.',
            'max' => 'The preferred language must not exceed 50 characters.',
        ],

        'timeZone' => [
            'string' => 'The time zone must be a string.',
            'max' => 'The time zone must not exceed 50 characters.',
        ],
    ],
];
