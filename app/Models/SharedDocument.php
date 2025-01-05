<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SharedDocument extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'company_id',
        'name',
        'email',
        'access_valid_until',
        'haccp_plan',
        'shared_access_token',
    ];

    public function getCreatedAtAttribute($value): string
    {
        return Carbon::parse($value)->format('d.m.Y');
    }

    public function getAccessValidUntilAttribute($value): string
    {
        return Carbon::parse($value)->format('d.m.Y');
    }
}
