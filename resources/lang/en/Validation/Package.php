<?php

return [
    'id' => [
        'integer' => 'The package ID must be an integer.',
    ],
    'annually_discounted_price' => [
        'required' => 'Annually discounted price is required.',
        'numeric' => 'Annually discounted price must be a numeric value.',
    ],
    'monthly_discounted_price' => [
        'required' => 'Monthly discounted price is required.',
        'numeric' => 'Monthly discounted price must be a numeric value.',
    ],
    'member_limit' => [
        'required' => 'Member limit is required.',
        'numeric' => 'Member limit must be a numeric value.',
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
        'required' => 'Details are required.',
        'string' => 'Details must be a string.',
    ],
    'monthly' => [
        'required' => 'Monthly field is required.',
        'boolean' => 'Monthly field must be true or false.',
    ],
    'yearly' => [
        'required' => 'Yearly field is required.',
        'boolean' => 'Yearly field must be true or false.',
    ],
    'yearly_saving' => [
        'nullable' => 'Yearly saving field is optional.',
        'string' => 'Yearly saving must be a string.',
    ],
];
