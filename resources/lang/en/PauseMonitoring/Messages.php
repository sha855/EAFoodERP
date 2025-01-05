<?php

return [
    'validate' => [
        'id' => [
            'integer' => 'Id must be an integer.',
        ],
        'monitoring_task_id' => [
            'required' => 'Task name is required.',
        ],
        'start_date' => [
            'required' => 'Start date is required.',
        ],
        'end_date' => [
            'required' => 'End date is required.',
            'after' => 'End date must be greater than start date.',
        ],
    ],
    'table' => [
        'startDate' => 'Start date',
        'endDate' => 'End date',
        'name' => 'Name',
        'warning' => 'This list shows which tasks are paused for a holiday. Set dates when your business unit does not need to perform monitoring according to you schedule (holiday).',
    ],
    'task' => [
        'created' => 'Pause task created successfully!',
        'updated' => 'Pause task updated successfully!',
        'deleted' => 'Pause task deleted successfully!',
        'notFound' => 'Pause task not found!',
    ],
    'delete' => [
        'confirm' => 'Confirm delete, this action cannot be undone?',
        'no' => 'Cancel',
        'yes' => 'Delete',
    ],
    'actions' => [
        'cancel' => 'Cancel',
        'save' => 'Save',
    ],
    'columns' => [
        'startDate' => 'Start Date',
        'endDate' => 'End Date',
        'taskList' => 'Task List',
        'selectTask' => 'Select Task',
        'edit' => 'Edit',
        'delete' => 'Delete',
        'actions' => 'Actions',
    ],
    'sidebarMenu' => [
        'task' => [
            'menu' => 'Task',
            'addNew' => 'Add New',
            'subMenu' => [
                'title' => 'Pause Monitoring',
            ],
        ],
    ],
    'confirm' => [
        'deleteMsg' => 'Are you sure you want to delete this?',
        'delete' => 'Delete pause',
        'cancel' => 'Cancel',
    ],
];
