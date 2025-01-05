<?php

return [
    'product_name' => [
        'required' => 'Product name is required.',
        'string' => 'Product name must be a string.',
        'max' => 'Product name may not be greater than 255 characters.',
    ],
    'upc_code' => [
        'string' => 'UPC code must be a string.',
        'max' => 'UPC code may not be greater than 255 characters.',
    ],
    'product_code' => [
        'string' => 'Product code must be a string.',
        'max' => 'Product code may not be greater than 255 characters.',
    ],
    'expiration_date' => [
        'date' => 'Expiration date must be a valid date.',
    ],
    'is_used_as_ingredient' => [
        'boolean' => 'Is used as an ingredient must be true or false.',
    ],
    'product_type' => [
        'required' => 'Product type is required.',
        'string' => 'Product type must be a string.',
        'in' => 'Product type must be one of the following: purchased, ourRecipe.',
    ],
    'expiration_type' => [
        'required' => 'Expiration type is required.',
        'string' => 'Expiration type must be a string.',
        'in' => 'Expiration type must be either best_before or use_by.',
    ],
    'best_before' => [
        'boolean' => 'Best before must be true or false.',
    ],
    'use_by' => [
        'boolean' => 'Use by must be true or false.',
    ],
    'files' => [
        'file' => 'Each file must be a valid file.',
        'mimes' => 'Each file must be a file of type: jpg, jpeg, png.',
        'max' => 'Each file may not be greater than 2048 kilobytes.',
    ],
];
