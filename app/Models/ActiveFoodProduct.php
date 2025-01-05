<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ActiveFoodProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'food_product_id',
        'user_id',
        'is_active',
    ];

    public function foodProduct(): BelongsTo
    {
        return $this->belongsTo(FoodProduct::class, 'food_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
