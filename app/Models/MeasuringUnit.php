<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MeasuringUnit extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'measuring_units';

    protected $fillable = [
        'name',
        'symbol',
        'value',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
