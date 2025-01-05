<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomProductIngredientAllergen extends Model
{
    use HasFactory;

    protected $table = 'custom_product_ingredient_allergens';

    protected $fillable = [
        'custom_product_ingredient_id',
        'allergen',
    ];
    
    public function customProductIngredient()
    {
        return $this->belongsTo(CustomProductIngredient::class, 'custom_product_ingredient_id');
    }
}
