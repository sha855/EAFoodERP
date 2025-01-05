<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'description',
        'is_required',
    ];

    public function frequencies()
    {
        return $this->hasMany(Frequency::class);
    }

    public function analyses()
    {
        return $this->hasMany(Analysis::class);
    }
}
