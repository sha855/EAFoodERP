<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CertificateAndTraining extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'certificates_and_trainings';

    protected $fillable = ['user_id', 'company_id', 'training_name', 'frequency'];
}
