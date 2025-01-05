<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Audit extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'auditor',
        'audit_date',
        'auditee',
        'file_path',
        'audit_template_id',
        'user_id',
        'company_id',
    ];

    public function auditTemplate(): BelongsTo
    {
        return $this->belongsTo(AuditTemplate::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
