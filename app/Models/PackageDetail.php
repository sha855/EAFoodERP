<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PackageDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'package_id',
        'details',
    ];

    public function package()
    {
        return $this->belongsTo(Package::class);
    }
}
