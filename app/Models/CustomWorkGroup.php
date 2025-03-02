<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomWorkGroup extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'custom_work_groups';

    protected $fillable = [
        'task',
        'responsible',
        'is_service_provider',
        'outsourced_service',
        'is_required',
        'user_id',
        'company_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(CompanyDetail::class);
    }
}
