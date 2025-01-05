<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class AnalysesTask extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'analyses_tasks';

    protected $fillable = [
        'task_name',
    ];

    public function taskDetail(): HasOne
    {
        return $this->HasOne(CompanyAnalysesTask::class);
    }
}
