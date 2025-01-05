<?php

return [
    'company_id' => [
        'required' => 'The company ID is required.',
        'integer' => 'The company ID must be an integer.',
        'exists' => 'The selected company ID is invalid.',
    ],
    'ingredients' => [
        'required' => 'The ingredient is required.',
    ],
    'volume' => [
        'required' => 'The volume is required.',
        'string' => 'The volume must be a string.',
    ],
    'unit' => [
        'required' => 'The unit is required.',
        'string' => 'The unit must be a string.',
    ],
    'period' => [
        'required' => 'The period is required.',
        'string' => 'The period must be a string.',
    ],
];
