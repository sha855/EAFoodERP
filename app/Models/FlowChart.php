<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class FlowChart extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'flow_charts';

    protected $fillable = [
        'name',
        'file_path',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }

    public function flowchartProcessStep(): HasMany
    {
        return $this->HasMany(FlowChartProcessStep::class);
    }
}
