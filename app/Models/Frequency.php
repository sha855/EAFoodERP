<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Frequency extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'task_id',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function analyses()
    {
        return $this->hasMany(Analysis::class);
    }
}
