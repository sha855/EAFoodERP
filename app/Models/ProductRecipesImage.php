<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductRecipesImage extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_recipes_image';

    protected $fillable = [
        'product_recipes_id',
        'image_name',
        'image_path',
        'created_at',
        'updated_at',
    ];

    public function productRecipe()
    {
        return $this->belongsTo(ProductRecipe::class, 'product_recipe_id');
    }
}
