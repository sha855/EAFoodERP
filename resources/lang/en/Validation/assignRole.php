<?php

return [
    'user_id' => [
        'required' => 'User ID is required.',
        'integer' => 'User ID must be an integer.',
        'exists' => 'User does not exist.',
    ],
    'role' => [
        'required' => 'Role name is required.',
        'string' => 'Role name must be a string.',
        'exists' => 'Role does not exist.',
    ],
];
