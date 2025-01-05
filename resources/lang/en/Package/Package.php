<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],
    'name' => [
        'required' => 'Name is required.',
        'string' => 'Name must be a string.',
        'max' => 'Name may not be greater than 255 characters.',
    ],
    'annually_discounted_price' => [
        'required' => 'Annual discounted price is required.',
        'numeric' => 'Annual discounted price must be a numeric value.',
    ],
    'annually_price' => [
        'required' => 'Annually price is required.',
        'numeric' => 'Annually price must be a numeric value.',
    ],
    'monthly_discounted_price' => [
        'required' => 'Monthly discounted price is required.',
        'numeric' => 'Monthly discounted price must be a numeric value.',
    ],
    'monthly_price' => [
        'required' => 'Monthly price is required.',
        'numeric' => 'Monthly price must be a numeric value.',
    ],
    'description' => [
        'required' => 'Description is required.',
        'string' => 'Description must be a string.',
        'max' => 'Description may not be greater than 255 characters.',
    ],
    'details' => [
        'required' => 'Details is required.',
        'string' => 'Details must be a string.',
    ],
];
