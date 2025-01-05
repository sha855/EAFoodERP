<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Process extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'company_id',
        'is_active',
        'activities',
        'order'
    ];

    protected $casts = [
        'activities' => 'array',
        'is_active' => 'boolean',
    ];

    public function processActivities()
    {
        return $this->hasMany(ProcessActivity::class);
    }
}
