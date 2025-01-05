<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],
    'first_last_name' => [
        'required' => 'Team member name is required.',
        'string' => 'Team member name must be a string.',
        'min' => 'Team member name may not be less than 4 characters.',
        'max' => 'Team member name may not be greater than 255 characters.',
    ],
    'position' => [
        'string' => 'Position must be a string.',
    ],
    'personal_identification_code' => [
        'string' => 'Personal identification code must be a string.',
        'min' => 'Personal identification code minimum length is 5 characters.',
        'max' => 'Personal identification code minimum length is 5 characters.',
    ],

];
