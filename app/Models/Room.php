<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Room extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'type',
        'area',
        'sensor_id',
        'below',
        'above',
        'allowed',
        'is_use',
        'company_id',
    ];

    protected $dates = ['deleted_at'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }

    public function roomEquipment():MorphMany
    {
        return $this->morphMany(MonitoringUsedFor::class, 'type');
    }
}
