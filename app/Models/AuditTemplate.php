<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuditTemplate extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'auditor',
        'auditee',
        'audit_frequency',
        'score_level',
        'start_date',
        'question',
        'is_confirmed',
        'company_id',
    ];

    protected $casts = [
        'question' => 'json',
    ];
}
