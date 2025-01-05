<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyIngredients extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'company_ingredients';

    protected $fillable = [
        'ingredient_id',
        'ingredient_type_id',
        'company_id',
        'is_chilled',
        'is_frozen',
        'is_room_temperature',
        'is_allergen',
    ];

    public function ingredient()
    {
        return $this->belongsTo(Ingredient::class);
    }

    public function ingredientType()
    {
        return $this->belongsTo(IngredientsType::class, 'ingredient_type_id');
    }

    public function company()
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }
}
