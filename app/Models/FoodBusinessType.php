<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodBusinessType extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'food_business_types';

    protected $fillable = ['name', 'description'];

    public function units(): HasMany
    {
        return $this->hasMany(FoodBusinessUnit::class);
    }

    public function additionalActivities(): HasMany
    {
        return $this->hasMany(AdditionalBusinessActivity::class);
    }

    public function foodBusinessType()
    {
        return $this->belongsTo(FoodBusinessType::class, 'business_type_id');
    }
}
