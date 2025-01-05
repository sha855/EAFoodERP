<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductPreparation extends Model
{
    use HasFactory;

    protected $table = 'product_preparation';

    protected $fillable = [
        'product_id',
        'amount',
        'volume',
        'expiry_date',
        'expiry_time',
        'batch_code',
        'comment',
        'company_id',
    ];


    public function productRecipe()
    {
        return $this->belongsTo(ProductRecipe::class, 'product_id');
    }

    public function preparationIngredients() : HasMany
    {
        return $this->hasMany(PreparationIngredient::class, 'product_preparation_id');
    }

    public function companyDetails()
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }
}
