<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsumerInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'consumer_infos';

    protected $fillable = [
        'company_id',
        'product_recipes_id',
        'ingredients',
        'consuming_guide',
        'storing_conditions',
    ];

    public function productRecipe(): BelongsTo
    {
        return $this->belongsTo(ProductRecipe::class, 'product_recipes_id');
    }

    public function allergenInfos(): HasMany
    {
        return $this->hasMany(ConsumerAllergenInfo::class, 'consumer_info_id');
    }
}
