<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessUnit extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'unit_name',
        'address',
        'phone',
        'manager',
        'food_business_type_id',
        'user_id',
        'additional_business_activity_id',
        'is_organic',
        'company_id',
        'food_business_unit_id',
        'customer_group_id',
        'average_number_of_customer',
        'is_terrace',
        'number_of_seats',
        'custom_business_unit',
        'custom_customer_group',
    ];

    protected $casts = [
        'is_organic' => 'boolean',
        'is_terrace' => 'boolean',
    ];

    public function companyDetail()
    {
        return $this->belongsTo(CompanyDetail::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function customerGroup()
    {
        return $this->belongsTo(MainCustomer::class);
    }
}
