<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class TeamCertificatesAndTraining extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'team_certificates_and_trainings';

    public $timestamps = false;

    protected $fillable = [
        'team_member_id',
        'training_id',
        'certificate_file',
        'certificate_issue_on',
        'certificate_valid_until',
    ];

    public function teamMember(): BelongsTo
    {
        return $this->belongsTo(Team::class, 'team_member_id');
    }

    public function training(): BelongsTo
    {
        return $this->belongsTo(CertificateAndTraining::class, 'training_id');
    }
}
