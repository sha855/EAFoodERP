<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TraceProductInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'trace_product_info';

    protected $fillable = [
        'product_recipes_id',
        'recipe_total_amount',
        'recipe_total_amount_unit',
        'one_portion_amount',
        'one_portion_amount_unit',
        'preparation_instructionst',
    ];

    public function productRecipes()
    {
        return $this->belongsTo(ProductRecipe::class, 'product_recipes_id');
    }

    public function ingredients()
    {
        return $this->hasMany(AddIngredients::class);
    }
}
