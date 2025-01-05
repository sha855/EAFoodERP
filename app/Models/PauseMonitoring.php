<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PauseMonitoring extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pause_monitorings';

    protected $fillable = [
        'user_id',
        'company_id',
        'analyses_task_id',
        'monitoring_task_id',
        'start_date',
        'end_date',
    ];

    public function analysesTask(): BelongsTo
    {
        return $this->belongsTo(AnalysesTask::class, 'analyses_task_id');
    }

    public function monitoringTask(): BelongsTo
    {
        return $this->belongsTo(MonitoringTask::class, 'monitoring_task_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }
}
