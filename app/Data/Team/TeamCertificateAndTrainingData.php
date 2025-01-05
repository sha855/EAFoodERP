<?php

namespace App\Data\Team;

use App\Models\TeamCertificatesAndTraining;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class TeamCertificateAndTrainingData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $trainingName,

        #[Rule('required', 'string', 'max:255')]
        public string $frequency,

        public ?int $companyId
    ) {}

    public static function fromModel(TeamCertificatesAndTraining $teamCertificatesAndTraining): self
    {
        return new self(
            id: $teamCertificatesAndTraining->id,
            trainingName: $teamCertificatesAndTraining->training_name,
            frequency: $teamCertificatesAndTraining->frequency,
            companyId: $teamCertificatesAndTraining->company_id
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Team/Training.id.integer'),

            'training_name.required' => __('Team/Training.training_name.required'),
            'training_name.string' => __('Team/Training.training_name.string'),
            'training_name.max' => __('Team/Training.training_name.max'),

            'frequency.required' => __('Team/Training.frequency.required'),
            'frequency.string' => __('Team/Training.frequency.string'),
            'frequency.max' => __('Team/Training.frequency.max'),
        ];
    }
}
