<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeaturedPermission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['permission_name'];

    public function roles()
    {
        return $this->belongsToMany(FeaturedRole::class, 'featured_role_permissions', 'feature_permission_id', 'feature_role_id');
    }
}
