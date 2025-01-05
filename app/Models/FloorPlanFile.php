<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FloorPlanFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'floor_plan_files';

    protected $fillable = [
        'name',
        'file_path',
        'floor_plan_id',
    ];

    public function floorPlan()
    {
        return $this->belongsTo(FloorPlan::class);
    }
}
