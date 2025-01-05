<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AdditionalBusinessActivity extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['name', 'food_business_type_id'];

    public function foodBusinessType(): BelongsTo
    {
        return $this->belongsTo(FoodBusinessType::class, 'food_business_type_id');
    }
}
