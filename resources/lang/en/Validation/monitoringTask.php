<?php

return [

    'task_id' => [
        'required' => 'Task ID is required.',
        'integer' => 'Task ID must be an integer.',
        'exists' => 'Task ID must exist in the monitoring tasks.',
    ],
    'is_enabled' => [
        'required' => 'Status is required.',
        'boolean' => 'Status must be a boolean value (true or false).',
    ],

];
