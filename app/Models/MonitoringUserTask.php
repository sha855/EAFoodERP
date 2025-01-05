<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class MonitoringUserTask extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'monitoring_task_id',
        'user_id',
        'company_id',
        'is_enabled',
    ];

    public function monitoringTask(): BelongsTo
    {
        return $this->belongsTo(MonitoringTask::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class);
    }
}
