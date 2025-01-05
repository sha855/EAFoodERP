<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class CompanyFoodProduct extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'company_food_product';

    protected $fillable = [
        'company_id',
        'food_product_id',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class, 'company_id');
    }

    public function foodProduct(): BelongsTo
    {
        return $this->belongsTo(BusinessUnitFoodProduct::class, 'food_product_id');
    }
}
