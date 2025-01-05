<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuditHazard extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'audit_hazards';

    protected $fillable = [
        'audit_template_id',
        'food_hazard_id',
    ];

    public function auditTemplate()
    {
        return $this->belongsTo(AuditTemplate::class);
    }

    public function foodHazard()
    {
        return $this->belongsTo(FoodHazard::class);
    }
}
