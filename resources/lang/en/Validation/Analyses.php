<?php

return [
    'Analyses' => [
        'name' => [
            'required' => 'Task name is required.',
            'string' => 'Task name must be a string.',
            'max' => 'Task name may not be greater than :max characters.',
        ],
        'frequency' => [
            'required' => 'Frequency is required.',
            'string' => 'Frequency must be a string.',
        ],
        'id' => [
            'required' => 'Company ID is required.',
            'integer' => 'Company ID must be an integer.',
        ],
        'analyses_task_id' => [
            'required' => 'Analyses task ID is required.',
            'integer' => 'Analyses task ID must be an integer.',
        ],
        'comment' => [
            'string' => 'Comment must be a string.',
            'max' => 'Comment may not be greater than :max characters.',
        ],
        'custom_frequency' => [
            'string' => 'Custom frequency must be a string.',
            'max' => 'Custom frequency may not be greater than :max characters.',
        ],
    ],
];
