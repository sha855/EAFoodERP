<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BusinessUser extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'full_name',
        'company_name',
        'work_email',
        'business_type_name',
        'total_no_of_employees',
        'stdcode',
        'phone',
        'document_url',
    ];
}
