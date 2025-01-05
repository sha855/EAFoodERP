<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AddIngredients extends Model
{
    use HasFactory;

    protected $table = 'add_ingredients';

    protected $fillable = [
        'trace_product_info_id',
        'ingredient',
        'amount',
        'unit',
    ];

    public function productRecipe()
    {
        return $this->belongsTo(ProductRecipe::class);
    }

    public function preparationIngredients() : HasMany
    {
        return $this->hasMany(PreparationIngredient::class, 'add_ingredient_id');
    }
}
