<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class FeaturedRole extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'company_id', 'name'];

    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(FeaturedPermission::class, 'featured_role_permissions', 'feature_role_id', 'feature_permission_id');
    }

    public function teamsFeaturedRoles(): HasMany
    {
        return $this->hasMany(TeamsFeaturedRole::class, 'featured_role_id');
    }
}
