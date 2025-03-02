<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StdCode extends Model
{
    use SoftDeletes;

    protected $fillable = ['code', 'country'];
}
