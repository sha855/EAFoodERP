<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class FoodBusinessUnit extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['food_business_type_id', 'name'];

    public function businessType(): BelongsTo
    {
        return $this->belongsTo(FoodBusinessType::class, 'food_business_type_id');
    }
}
