<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductionVolume extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'food_product_id',
        'company_id',
        'volume',
        'unit',
        'period',
    ];

    public function foodProduct(): BelongsTo
    {
        return $this->belongsTo(BusinessUnitFoodProduct::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class);
    }
}
