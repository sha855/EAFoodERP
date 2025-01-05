<?php

return [
    'PackageComparison' => [
        'featureId' => [
            'required' => 'The feature ID is required.',
            'integer' => 'The feature ID must be an integer.',
            'min' => 'The feature ID must be at least 1.',
        ],
        'featureHeadingId' => [
            'required' => 'The feature heading ID is required.',
            'integer' => 'The feature heading ID must be an integer.',
            'min' => 'The feature heading ID must be at least 1.',
        ],
        'isActive' => [
            'required' => 'The active status is required.',
            'array' => 'The active status must be an array.',
        ],
        'optionalAct' => [
            'nullable' => 'The optional actions field is nullable.',
            'array' => 'The optional actions field must be an array.',
        ],
        'packageId' => [
            'required' => 'The package ID is required.',
            'array' => 'The package ID must be an array.',
        ],
    ],
];
