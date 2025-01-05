<?php

return [
    'role' => [
        'required' => 'Role name is required.',
        'string' => 'Role name must be a string.',
        'exists' => 'Role does not exist.',
    ],
    'permissions' => [
        'array' => 'Permissions must be an array.',
    ],
];
