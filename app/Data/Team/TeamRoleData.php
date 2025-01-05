<?php

namespace App\Data\Team;

use App\Models\TeamsFeaturedRole;
use Illuminate\Validation\Rule as ValidationRule;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class TeamRoleData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $name,

        public ?int $companyId
    ) {}

    public static function fromModel(TeamsFeaturedRole $team): self
    {
        return new self(
            id: $team->id,
            name: $team->name,
            companyId : $team->company_id,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Team/TeamRole.id.integer'),
            'name.required' => __('Team/TeamRole.name.required'),
            'name.string' => __('Team/TeamRole.name.string'),
            'name.max' => __('Team/TeamRole.name.max'),
        ];
    }

    public static function rules(): array
    {
        return [
            'name' => [
                'required',
                ValidationRule::unique('featured_roles')->ignore(request('id')),
            ],
        ];
    }
}
