<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessUnitFoodProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'business_unit_food_product';

    protected $fillable = [
        'product',
        'company_id',
        'description',
        'is_active',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }

    public function companyFoodProduct(): HasOne
    {
        return $this->HasOne(CompanyFoodProduct::class, 'food_product_id', 'id');
    }

    public function productionVolume(): HasOne
    {
        return $this->hasOne(ProductionVolume::class, 'food_product_id', 'id');
    }

    public function OtherProductionVolume() : HasOne
    {
        return $this->hasOne(OtherProductionVolume::class, 'food_product_id', 'id');
    }
}
