<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlowChartProcessStep extends Model
{
    use HasFactory;

    protected $fillable = [
        'flow_chart_id',
        'company_id',
        'process_step',
        'type',
        'is_time',
        'is_temperature',
        'is_quality',
        'is_recording',
        'instruction',
    ];
}
