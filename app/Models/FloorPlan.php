<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FloorPlan extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'floor_plan',
        'company_id',
        'is_active',
    ];

    public function company()
    {
        return $this->belongsTo(CompanyDetail::class);
    }

    public function files()
    {
        return $this->hasMany(FloorPlanFile::class, 'floor_plan_id');
    }
}
