<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProcessActivity extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'process_id',
        'description',
        'company_id',
        'is_active',
    ];

    public function process()
    {
        return $this->belongsTo(Process::class);
    }

    public function activeProcessSteps(): HasMany
    {
        return $this->hasMany(ActiveProcessSteps::class);
    }
}
