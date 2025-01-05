<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreparationIngredient extends Model
{
    use HasFactory;

    protected $table = 'preparation_ingredients';

    protected $fillable = [
        'product_preparation_id',
        'add_ingredient_id',
        'batch_no',
        'expiry_date',
        'amount',
        'unit',
    ];


    public function productPreparation()
    {
        return $this->belongsTo(ProductPreparation::class, 'product_preparation_id');
    }


    public function addIngredient()
    {
        return $this->belongsTo(AddIngredients::class, 'add_ingredient_id');
    }
}
