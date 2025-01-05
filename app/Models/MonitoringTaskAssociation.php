<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MonitoringTaskAssociation extends Model
{
    protected $fillable = [
        'monitoring_task_id',
        'associable_type',
        'fields',
    ];

    protected $casts = [
        'fields' => 'array',
    ];

    public function task(): BelongsTo
    {
        return $this->belongsTo(MonitoringTask::class);
    }
}
