<?php

return [
    'files' => [
        'required' => 'Files are required.',
        'array' => 'Files must be an array.',
    ],
    'files.*' => [
        'file' => 'Each file must be a valid file.',
        'mimes' => 'Files must be of type jpg, jpeg, png, pdf, xls, xlsx, svg, or csv.',
        'max' => 'Each file may not be greater than 2048 kilobytes.',
    ],
];
