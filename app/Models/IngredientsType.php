<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class IngredientsType extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'food_temperature_reception',
        'is_frozen',
        'is_chilled',
        'is_room_temperature',
        'ingredient_id',
        'company_id',
    ];

    public function ingredient(): BelongsTo
    {
        return $this->belongsTo(Ingredient::class);
    }
}
