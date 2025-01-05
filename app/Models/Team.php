<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Team extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'company_id',
        'first_last_name',
        'position',
        'personal_identification_code',
        'phone_number',
        'email',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function companyDetails(): BelongsTo
    {
        return $this->belongsTo(CompanyDetail::class);
    }

    public function certificatesAndTrainings(): HasMany
    {
        return $this->hasMany(TeamCertificatesAndTraining::class, 'team_member_id', 'id');
    }

    public function roles(): HasMany
    {
        return $this->hasMany(TeamsFeaturedRole::class, 'team_member_id', 'id');
    }
}
