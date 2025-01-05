<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyAnalysesTask extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'company_analyses_tasks';

    protected $fillable = [
        'company_id',
        'frequency',
        'comment',
        'custom_frequency',
        'analyses_task_id',
    ];

    public function company()
    {
        return $this->belongsTo(CompanyDetail::class);
    }

    public function analysesTask()
    {
        return $this->belongsTo(AnalysesTask::class);
    }
}
