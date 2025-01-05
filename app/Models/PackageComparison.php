<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PackageComparison extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'package_id',
        'feature_id',
        'feature_heading_id',
        'is_active',
        'optional_act',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }

    public function featurePackage()
    {
        return $this->belongsTo(PackageFeature::class, 'feature_id', 'id');
    }

    public function featureHeading()
    {
        return $this->belongsTo(FeatureHeading::class);
    }
}
