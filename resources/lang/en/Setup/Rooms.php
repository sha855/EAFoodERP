<?php

return [
    'validation' => [
        'name' => 'Name is required.',
        'type' => 'Type is required.',
        'area' => 'Area is required.',
        'sensorId' => 'Sensor Id is required.',
        'allowed' => 'This field is required.',
    ],
    'name' => 'Rooms',
    'addButton' => 'Add New',
    'alert' => [
        'full' => 'This is a list of pre-set rooms in your business unit based on your profile. Users can relate the equipment listed in this view to a particular task. Add more rooms and tasks according to your needs.z',
        'short' => 'Need help? Read our article How to set up/add new rooms to your account.',
    ],
    'filter' => [
        'all' => 'All rooms',
        'active' => 'Active rooms',
        'deactivated' => 'Deactivated rooms',
    ],
    'columns' => [
        'name' => 'Name',
        'type' => 'Type',
        'area' => 'Area (m²)',
        'is_use' => 'In use',
        'actions' => 'Actions',
        'edit' => 'Edit',
        'delete' => 'Delete',
    ],

    'createModal' => [
        'createFormTitle' => 'Room setup',
        'form' => [
            'name' => 'Name',
            'sensor_id' => 'Sensor ID',
            'type' => 'Type',
            'area' => 'Area (m²)',
        ],
        'alert' => [
            'message' => 'Attach all food safety tasks that are completed in this room. Select from a list of standard tasks that you can customize according to your needs.',
        ],
    ],
    'button' => [
        'save' => 'Save',
        'cancel' => 'Cancel',
    ],

    'messages' => [
        'create' => 'Room create successfully!',
        'update' => 'Room updated successfully!',
        'delete' => 'Room deleted successfully!',
    ],
];
