<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class WorkGroup extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'task',
        'responsible',
        'is_service_provider',
        'outsourced_service',
        'is_required',
        'user_id',
        'company_id',
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function responsibleUser()
    {
        return $this->belongsTo(User::class, 'responsible', 'id');
    }
}
