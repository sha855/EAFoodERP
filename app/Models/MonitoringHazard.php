<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MonitoringHazard extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'monitoring_hazards';

    protected $fillable = [
        'food_hazard_id',
        'monitoring_task_id',
    ];

    public function foodHazard()
    {
        return $this->belongsTo(FoodHazard::class);
    }

    public function monitoringTask()
    {
        return $this->belongsTo(MonitoringTask::class);
    }
}
