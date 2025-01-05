<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Package extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'annually_price',
        'annually_discounted_price',
        'monthly_price',
        'monthly_discounted_price',
        'is_trial',
        'member_limit',
        'is_active',
        'yearly',
        'monthly',
        'yearly_saving',
    ];

    public function packageComparison()
    {
        return $this->hasMany(PackageComparison::class);
    }

    public function details()
    {
        return $this->hasMany(PackageDetail::class);
    }
}
