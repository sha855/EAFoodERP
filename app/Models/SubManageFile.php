<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class SubManageFile extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'sub_menu_id',
        'name',
        'file',
    ];

    public function getUpdatedAtAttribute($value): string
    {
        return Carbon::parse($value)->format('d.m.Y');
    }
}
