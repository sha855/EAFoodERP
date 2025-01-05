<?php

return [
    'company_id' => [
        'required' => 'The company ID field is required.',
        'integer' => 'The company ID must be an integer.',
        'exists' => 'The selected company ID is invalid.',
    ],
    'ingredients' => [
        'required' => 'The ingredients field is required.',
        'array' => 'The ingredients must be an array.',
        'min' => 'At least one ingredient is required.',
        'ingredient_structure' => 'Each ingredient must be a valid structure.',
    ],
];
