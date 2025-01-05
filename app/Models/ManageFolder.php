<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class ManageFolder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['user_id', 'company_id', 'parent_id', 'menu'];

    public function getSlugAttribute(): string
    {
        return Str::slug($this->menu, '-');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(ManageFolder::class, 'parent_id');
    }

    public function subfolders(): HasMany
    {
        return $this->hasMany(ManageFolder::class, 'parent_id');
    }
}
