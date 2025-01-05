<?php

namespace App\Http\Requests\Monitoring;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MonitoringTaskSetupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'task_name' => [
                'required',
                'string',
                Rule::unique('monitoring_tasks', 'name')->ignore(request('id')),
            ],
            'task_related' => 'required|string',
            'type' => 'required|string',
        ];

    }
}
