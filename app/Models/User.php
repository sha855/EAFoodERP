<?php

namespace App\Models;

use Illuminate\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Lab404\Impersonate\Models\Impersonate;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, HasRoles, Impersonate, MustVerifyEmail, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'std_code',
        'phone_no',
        'password',
        'email_verified_at',
        'token',
        'two_factor_secret',
        'is_two_factor_enabled',
        'two_factor_recovery_codes',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_recovery_codes' => 'array',
        ];
    }

    public function companyDetail(): HasMany
    {
        return $this->hasMany(CompanyDetail::class)->orderBy('id', 'desc');
    }

    public function audits(): HasMany
    {
        return $this->HasMany(Audit::class);
    }

    public function measuringUnits()
    {
        return $this->hasMany(MeasuringUnit::class);
    }

    public function teams(): HasMany
    {
        return $this->hasMany(Team::class);
    }
}
