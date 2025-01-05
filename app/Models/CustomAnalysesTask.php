<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomAnalysesTask extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'custom_analyses_tasks';

    protected $fillable = [
        'task_name',
        'company_id',
        'frequency',
        'comment',
        'custom_frequency',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }
}
