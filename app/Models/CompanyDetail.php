<?php

namespace App\Models;

use App\Observers\CompanyObserver;
use App\Observers\FeaturedRoleObserver;
use App\Observers\ManageFolderObserver;
use App\Observers\ProcessActivityObserver;
use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

#[ObservedBy([CompanyObserver::class, FeaturedRoleObserver::class, ManageFolderObserver::class , ProcessActivityObserver::class])]
class CompanyDetail extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'company_name',
        'country_name',
        'business_type_id',
        'total_no_of_employees',
        'total_no_of_business_locations',
        'company_registration_number',
        'registration_number',
        'vat_no',
        'address',
        'email',
        'preferred_language',
        'volume_units',
        'weight_units',
        'temperature_unit',
        'monitoring',
        'temperature_prefill',
        'date_format',
        'is_selected',
        'is_haccp_completed',
        'phone',
        'representative_person',
        'work_email_for_notification',
        'time_zone',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function businessType(): BelongsTo
    {
        return $this->belongsTo(FoodBusinessType::class);
    }

    public function businessUnit(): HasOne
    {
        return $this->hasOne(BusinessUnit::class, 'company_id', 'id');
    }

    public function companyDetails()
    {
        return $this->hasMany(CompanyDetail::class, 'business_type_id');
    }
}
