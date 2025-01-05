<?php

return [
    'name' => [
        'required' => 'The food business type name is required.',
        'string' => 'The food business type name must be a string.',
        'max' => 'The food business type name may not be greater than :max characters.',
    ],
    'description' => [
        'required' => 'The description is required.',
        'string' => 'The description must be a string.',
        'max' => 'The description may not be greater than :max characters.',
    ],
    'active' => [
        'boolean' => 'The active field must be true or false.',
    ],
];
