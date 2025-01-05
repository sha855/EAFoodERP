<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodHazard extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'food_hazards';

    protected $fillable = [
        'custom_process_id',
        'company_id',
        'potential_hazards',
        'hazards_type',
        'likelihood',
        'severity',
        'risk_level',
        'justification_decision',
        'preventive_measure',
        'critical_limit',
        'corrective_action',
        'verification',
    ];

    public function customProcess(): BelongsTo
    {
        return $this->belongsTo(CustomProcess::class);
    }

    public function monitoringHazards(): HasMany
    {
        return $this->hasMany(MonitoringHazard::class);

    }

    public function auditHazards(): HasMany
    {
        return $this->hasMany(AuditHazard::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class);
    }
}
