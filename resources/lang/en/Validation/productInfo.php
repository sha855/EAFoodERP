<?php

return [
    'recipe_total_amount' => [
        'required' => 'Recipe Total Amount is required.',
        'numeric' => 'Recipe Total Amount must be a number.',
    ],
    'recipe_total_amount_unit' => [
        'required' => 'Recipe Total Amount unit is required.',
        'string' => 'Recipe total amount unit must be a string',
    ],
    'one_portion_amount' => [
        'required' => 'One Portion Amount is required.',
        'numeric' => 'One Portion Amount must be numeric.',
    ],
    'one_portion_amount_unit' => [
        'required' => 'One portion Amount unit is required.',
        'string' => 'One portion amount unit must be a string',
    ],
    'preparation_instructionst' => [
        'required' => 'Preparation Instructions are required.',
        'string' => 'Preparation Instructions must be a string.',
    ],
    'ingredients' => [
        'required' => 'Ingredients are required.',
        'array' => 'Ingredients must be an array.',
        'ingredient' => [
            'required' => 'Ingredient is required.',
            'string' => 'Ingredient must be a string.',
        ],
        'amount' => [
            'required' => 'Amount is required.',
            'numeric' => 'Amount must be a number.',
        ],
        'unit' => [
            'required' => 'Unit is required.',
            'string' => 'Unit must be a string.',
        ],
    ],
];
