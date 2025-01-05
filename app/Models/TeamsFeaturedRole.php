<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeamsFeaturedRole extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'team_member_id',
        'featured_role_id',
    ];

    public $timestamps = false;

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function featured_role(): BelongsTo
    {
        return $this->belongsTo(FeaturedRole::class);
    }
}
