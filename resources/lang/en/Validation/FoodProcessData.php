<?php

return [
    'process_name' => [
        'required' => 'The process name is required.',
        'string' => 'The process name must be a valid string.',
        'max' => 'The process name cannot exceed :max characters.',
    ],

    'company_id' => [
        'required' => 'The company ID is required.',
        'integer' => 'The company ID must be an integer.',
    ],

    'likelihood' => [
        'integer' => 'The likelihood must be an integer.',
    ],

    'severity' => [
        'integer' => 'The severity must be an integer.',
    ],

    'risk_level' => [
        'string' => 'The risk level must be a valid string.',
    ],

    'justification_decision' => [
        'string' => 'The justification decision must be a valid string.',
    ],

    'preventive_measure' => [
        'string' => 'The preventive measure must be a valid string.',
    ],

    'critical_limit' => [
        'string' => 'The critical limit must be a valid string.',
    ],

    'corrective_action' => [
        'string' => 'The corrective action must be a valid string.',
    ],

    'verification' => [
        'string' => 'The verification must be a valid string.',
    ],

    'monitoring_task_id' => [
        'array' => 'The monitoring task ID must be an array.',
    ],

    'audit_template_id' => [
        'array' => 'The audit template ID must be an array.',
    ],
];
