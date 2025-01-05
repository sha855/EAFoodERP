<?php

return [
    'role' => [
        'required' => 'Role name is required.',
        'string' => 'Role name must be a string.',
        'max' => 'Role name may not be greater than 255 characters.',
    ],
    'permissions' => [
        'array' => 'Permissions must be an array.',
    ],
];
