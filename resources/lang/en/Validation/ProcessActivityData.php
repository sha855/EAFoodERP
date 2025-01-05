<?php

return [
    'process_id' => [
        'required' => 'The process ID is required.',
        'integer' => 'The process ID must be an integer.',
    ],
    'is_active' => [
        'required' => 'The active status is required.',
        'boolean' => 'The active status must be true or false.',
    ],
    'selected_process_activities' => [
        'array' => 'The selected process activities must be an array.',
    ],
];
