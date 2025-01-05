<?php

return [
    'country' => [
        'required' => 'Country is required.',
        'regex' => 'Country code must be in the correct format.',
    ],
    'stdcode' => [
        'required' => 'Standard code is required.',
        'regex' => 'Standard code must start with a + followed by digits.',
    ],
    'phone' => [
        'required' => 'Phone number is required.',
        'regex' => 'Phone number must be in a valid format.',
    ],
];
