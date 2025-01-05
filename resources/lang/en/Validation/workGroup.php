<?php

return [
    'id' => [
        'max' => 'The ID must not be greater than :max.',
    ],
    'task' => [
        'string' => 'The task must be a string.',
        'max' => 'The task must not be greater than :max characters.',
    ],
    'responsible' => [
        'required' => 'The responsible field is required.',
        'string' => 'The responsible field must be a string.',
        'max' => 'The responsible field must not be greater than :max characters.',
    ],
    'company_id' => [
        'required' => 'The company ID field is required.',
        'string' => 'The company ID field must be a string.',
        'max' => 'The company ID field must not be greater than :max characters.',
    ],
    'is_custom' => [
        'required' => 'The is custom field is required.',
        'string' => 'The is custom field must be a string.',
        'max' => 'The is custom field must not be greater than :max characters.',
    ],
    'outsource' => [
        'required' => 'The outsource field is required.',
        'string' => 'The outsource field must be a string.',
        'max' => 'The outsource field must not be greater than :max characters.',
    ],
    'is_required' => [
        'required' => 'The is required field is required.',
        'string' => 'The is required field must be a string.',
        'max' => 'The is required field must not be greater than :max characters.',
    ],
];
