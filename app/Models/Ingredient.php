<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Ingredient extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'company_id',
    ];

    public function ingredientTypes(): HasMany
    {
        return $this->hasMany(IngredientsType::class);
    }

    public function companyIngredients(): HasMany
    {
        return $this->hasMany(CompanyIngredients::class, 'ingredient_id', 'id');
    }
}
