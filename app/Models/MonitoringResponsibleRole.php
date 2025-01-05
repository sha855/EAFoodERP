<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class MonitoringResponsibleRole extends Model
{
    protected $fillable = [
        'monitoring_task_id',
        'task_related',
        'is_assign_task',
        'assign_task_to',
        'frequency',
        'is_frequency',
        'custom',
        'allow_not_done',
        'room_equipment_id',
        'checklist_task_title',
        'name',
        'is_multiple',
    ];

    protected $casts = [
        'custom' => 'array',
    ];

    protected $with = ['assignedRole', 'type'];

    public function monitoringTask(): BelongsTo
    {
        return $this->belongsTo(MonitoringTask::class, 'monitoring_task_id');
    }

    public function assignedRole(): BelongsTo
    {
        return $this->belongsTo(FeaturedRole::class, 'assign_task_to');
    }

    public function type(): MorphTo
    {
        return $this->morphTo('type', 'task_related', 'room_equipment_id');
    }
}
