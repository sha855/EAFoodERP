<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductRecipe extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id',
        'product_name',
        'upc_code',
        'product_code',
        'expiration',
        'expiration_type',
        'expiration_time',
        'expiration_best_before',
        'expiration_use_by',
        'is_used_as_ingredient',
        'product_type',
    ];

    public function images() : HasMany
    {
        return $this->hasMany(ProductRecipesImage::class, 'product_recipes_id');
    }

    public function TraceProductInfo() : hasOne
    {
        return $this->hasOne(TraceProductInfo::class, 'product_recipes_id', 'id');
    }

    public function consumerInfo(): HasOne
    {
        return $this->hasOne(ConsumerInfo::class, 'product_recipes_id');
    }
}
