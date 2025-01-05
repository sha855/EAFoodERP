<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],
    'training_name' => [
        'required' => 'Training name is required.',
        'string' => 'Training name must be a string.',
        'max' => 'Training name may not be greater than 255 characters.',
    ],
    'frequency' => [
        'required' => 'Frequency is required.',
        'string' => 'Frequency must be a string.',
        'max' => 'Frequency may not be greater than 255 characters.',
    ],
];
