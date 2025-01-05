<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeaturedRolePermission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['feature_role_id', 'feature_permission_id'];
}
