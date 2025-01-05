<?php

namespace App\Data\Team;

use App\Models\Team;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class TeamData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string', 'min:4', 'max:255')]
        public string $firstLastName,

        #[Rule('nullable', 'string')]
        public ?string $position,

        #[Rule('nullable', 'string', 'min:5', 'max:255')]
        public ?string $personalIdentificationCode,

        #[Rule('nullable', 'string')]
        public ?string $phoneNumber,

        #[Rule('nullable')]
        public ?array $teamCertificates,

        #[Rule('nullable')]
        public ?array $teamRoles,

        public ?int $companyId,

    ) {}

    public static function fromModel(Team $team): self
    {
        return new self(
            id: $team->id,
            firstLastName: $team->first_last_name,
            position: $team->position,
            companyId : $team->company_id,
            personalIdentificationCode: $team->personal_identification_code,
            phoneNumber: $team->phone_number,
            teamCertificates: $team->team_certificates,
            teamRoles: $team->team_roles,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Team/TeamMember.id.integer'),

            'first_last_name.required' => __('Team/TeamMember.first_last_name.required'),
            'first_last_name.string' => __('Team/TeamMember.first_last_name.string'),
            'first_last_name.min' => __('Team/TeamMember.first_last_name.min'),
            'first_last_name.max' => __('Team/TeamMember.first_last_name.max'),

            'position.string' => __('Team/TeamMember.position.string'),

            'personal_identification_code.string' => __('Team/TeamMember.personal_identification_code.string'),
            'personal_identification_code.min' => __('Team/TeamMember.personal_identification_code.min'),
            'personal_identification_code.max' => __('Team/TeamMember.personal_identification_code.max'),

        ];
    }
}
