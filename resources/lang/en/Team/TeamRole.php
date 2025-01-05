<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],
    'name' => [
        'required' => 'Role name is required.',
        'string' => 'Role name must be a string.',
        'max' => 'Role name may not be greater than 255 characters.',
    ],
];
