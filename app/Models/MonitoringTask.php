<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class MonitoringTask extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'task_related',
        'summary',
        'instructions_editor',
        'company_id',
        'user_id',
        'is_verification',
        'verifier',
        'frequency',
        'is_enabled',
    ];

    public function associations(): HasMany
    {
        return $this->hasMany(MonitoringTaskAssociation::class);
    }

    public function usedFors(): HasMany
    {
        return $this->hasMany(MonitoringUsedFor::class);
    }

    public function responsibleRoles(): HasMany
    {
        return $this->hasMany(MonitoringResponsibleRole::class);
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
