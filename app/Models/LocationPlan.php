<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LocationPlan extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'location_plans';

    protected $fillable = [
        'name',
        'file_path',
        'company_id',
    ];

    public function company()
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }
}
