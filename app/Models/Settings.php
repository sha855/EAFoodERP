<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class settings extends Model
{
    use HasFactory;

    protected $table = 'settings';

    protected $fillable = [
        'logo_path',
        'full_logo_path',
        'favicon_path',
        'mobile_logo_path',
        'dark_logo_path',
        'api_token',
    ];
}
