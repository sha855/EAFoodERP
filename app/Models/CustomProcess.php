<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CustomProcess extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'custom_processes';

    protected $fillable = [
        'process_name',
        'company_id',
        'is_active_process',
        'additional_info',
        'is_active_add_info',
        'hazard_info',
        'is_active_hazard_info',
        'is_active_haz_info',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class);
    }
}
