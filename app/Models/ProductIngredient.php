<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductIngredient extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'product_ingredient';
    protected $fillable = [
        'name',
    ];

    protected $dates = ['deleted_at'];
}
