<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'countries';

    protected $primaryKey = 'country_id';

    protected $fillable = [
        'iso2',
        'short_name',
        'long_name',
        'iso3',
        'numcode',
        'un_member',
        'calling_code',
        'cctld',
    ];

    protected $hidden = [];

    protected $casts = [];
}
