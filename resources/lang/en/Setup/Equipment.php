<?php

return [
    'validation' => [
        'name' => 'The Name is required.',
        'sensorId' => 'The Sensor Id is required.',
        'type' => 'Type is required.',
        'roomId' => 'The Room is required.',
        'allowed' => 'This field is required.',
    ],
    'name' => 'Equipments',
    'addButton' => 'Add New',
    'alert' => [
        'full' => 'This is a list of pre-set equipment based on your business profile. Users can categorize tasks based on the equipment used.',
        'short' => 'Need help? Read our article How to set up/add new equipment to your account.',
    ],
    'filter' => [
        'all' => 'All equipment',
        'active' => 'Active equipment',
        'deactivated' => 'Deactivated equipment',
    ],
    'columns' => [
        'name' => 'Name',
        'type' => 'Type',
        'room' => 'Room',
        'is_use' => 'In use',
        'actions' => 'Actions',
        'edit' => 'Edit',
        'delete' => 'Delete',
    ],

    'createModal' => [
        'createFormTitle' => 'Equipment setup',
        'form' => [
            'name' => 'Name',
            'sensor_id' => 'Sensor ID',
            'type' => 'Type',
            'room' => 'Room',
        ],
        'alert' => [
            'food_safety' => 'Food safety tasks',
            'message' => 'Add all food safety tasks that are related to this equipment. We have created a list of standard tasks that you can easily edit according to your needs.',
        ],
    ],
    'button' => [
        'save' => 'Save',
        'cancel' => 'Cancel',
    ],
    'messages' => [
        'create' => 'Equipment create successfully!',
        'update' => 'Equipment updated successfully!',
        'delete' => 'Equipment deleted successfully!',
    ],
];
