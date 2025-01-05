<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomProductIngredient extends Model
{
    use HasFactory;
    protected $table = 'custom_product_ingredients';
    protected $fillable = [
        'company_id',
        'name',
    ];

    public function allergens()
    {
        return $this->hasMany(CustomProductIngredientAllergen::class, 'custom_product_ingredient_id');
    }
}
