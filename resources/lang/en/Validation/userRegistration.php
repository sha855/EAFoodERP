<?php

return [
    'name' => [
        'required' => 'Name is required.',
    ],
    'email' => [
        'required' => 'Email is required.',
        'email' => 'Email must be a valid email address.',
        'unique' => 'This email is already taken.',
    ],
    'password' => [
        'required' => 'Password is required.',
        'min' => 'Password must be at least 8 characters.',
    ],
    'password_confirmation' => [
        'same' => 'Passwords must match.',
    ],
];
