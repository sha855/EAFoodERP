<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PackageFeature extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'feature_heading_id',
        'feature_name',
        'feature_description',
    ];

    public function featureHeading()
    {
        return $this->belongsTo(FeatureHeading::class);
    }
}
