<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AuditQuestion extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'questions',
        'audit_template_id',
        'selected_score',
        'comments',
    ];

    public function auditTemplate(): BelongsTo
    {
        return $this->belongsTo(AuditTemplate::class);
    }
}
