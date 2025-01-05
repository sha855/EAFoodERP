<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MonitoringUsedFor extends Model
{
    protected $fillable = [
        'monitoring_task_id',
        'usefor_id',
        'usefor_type',
    ];

    protected $with = ['type'];

    public function monitoringTask(): BelongsTo
    {
        return $this->belongsTo(MonitoringTask::class, 'monitoring_task_id');
    }

    public function type(): MorphTo
    {
        return $this->morphTo('type', 'usefor_type', 'usefor_id');
    }
}
