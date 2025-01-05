<?php

return [
    'name' => [
        'required' => 'Name is required.',
        'string' => 'Name must be a string.',
        'max' => 'Name may not be greater than 255 characters.',
    ],
    'scoreLevel' => [
        'required' => 'Score level is required.',
        'string' => 'Score level must be a string.',
        'max' => 'Score level may not be greater than 255 characters.',
    ],
    'startDate' => [
        'required' => 'Start date is required.',
        'date' => 'Start date must be a valid date.',
        'date_format' => 'Start date must be in the format YYYY-MM-DD.',
    ],
    'question' => [
        'required' => 'Questions are required.',
        'array' => 'Questions must be an array.',
        'min' => 'Questions cannot be empty.',
    ],
    'question.*.text' => [
        'required' => 'Each question must have text.',
        'string' => 'Question text must be a string.',
    ],
];
