<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ConsumerAllergenInfo extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'consumer_allergen_info';

    protected $fillable = [
        'consumer_info_id',
        'key',
        'value',
    ];

    public function consumer()
    {
        return $this->belongsTo(ConsumerInfo::class, 'consumer_info_id');
    }
}
