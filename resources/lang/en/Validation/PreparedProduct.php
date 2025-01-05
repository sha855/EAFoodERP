<?php

return [
    'productInfo' => [
        'ingredient_id' => [
            'required' => 'The ingredient ID is required.',
            'numeric' => 'The ingredient ID must be a number.',
        ],
        'batch' => [
            'required' => 'The batch field is required.',
            'numeric' => 'The batch must be a number.',
        ],
        'expiry_date' => [
            'required' => 'The expiry date is required.',
            'string' => 'The expiry date must be a string.',
        ],
        'amount' => [
            'required' => 'The amount is required.',
            'numeric' => 'The amount must be a number.',
        ],
        'unit' => [
            'required' => 'The unit is required.',
            'string' => 'The unit must be a string.',
        ],
    ],
];
