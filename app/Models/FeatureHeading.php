<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeatureHeading extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['feature_heading'];

    public function packageFeatures()
    {
        return $this->hasMany(PackageFeature::class);
    }
}
