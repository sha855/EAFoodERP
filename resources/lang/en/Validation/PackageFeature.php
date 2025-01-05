<?php

return [
    'PackageFeature' => [
        'featureName' => [
            'required' => 'The feature name is required.',
            'string' => 'The feature name must be a string.',
            'max' => 'The feature name may not be greater than 255 characters.',
        ],

        'featureDescription' => [
            'required' => 'The feature description is required.',
            'string' => 'The feature description must be a string.',
        ],

        'featureHeadingId' => [
            'required' => 'The feature heading ID is required.',
            'integer' => 'The feature heading ID must be an integer.',
        ],
    ],
];
