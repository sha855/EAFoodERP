<?php

return [
    'id' => [
        'integer' => 'Id must be an integer.',
    ],
    'user_id' => [
        'integer' => 'User Id must be an integer.',
    ],
    'company_id' => [
        'integer' => 'Company Id must be an integer.',
    ],
    'name' => [
        'required' => 'Name is required.',
        'string' => 'Name must be a string.',
        'min' => 'Name may not be less than 4 characters.',
        'max' => 'Name may not be greater than 255 characters.',
    ],
    'api_access_token' => [
        'string' => 'Api access token must be a string.',
        'min' => 'Api access token may not be less than 4 characters.',
        'max' => 'Api access token may not be greater than 255 characters.',
    ],
    'token' => [
        'created' => 'API access token created successfully!',
        'deleted' => 'API access token deleted successfully!',
    ],
    'table' => [
        'name' => 'Name',
        'apiToken' => 'API Token',
        'edit' => 'Edit',
        'delete' => 'Delete',
        'cancel' => 'Cancel',
    ],
    'data' => [
        'setupIntegration' => 'Setup Integration',
        'integration' => 'Integration',
        'warning' => 'Integrate your food safety management system with smart devices and IoT temperature sensors to make monitoring faster. All your data is accessible from one dashboard. You do not need to switch between different solutions.',
        'topMsg' => 'API access tokens are necessary for authentication to integrate your devices with Owlly.',
        'createApiToken' => 'Create Api token',
        'nodataAvailable' => 'There are no records to show',
    ],
    'confirm' => [
        'deleteMsg' => 'Are you sure want to delete this API token?',
        'delete' => 'Delete',
        'cancel' => 'Cancel',
    ],
];
