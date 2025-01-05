<?php

namespace App\Data\Setup;

use App\Models\Room;
use Illuminate\Validation\Rule as ValidationRule;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class RoomsData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('nullable', 'integer')]
        public ?int $companyId,

        #[Rule('required', 'string')]
        public $name,

        #[Rule('required', 'string')]
        public $type,

        #[Rule('required', 'numeric')]
        public $area,

        #[Rule('nullable', 'string')]
        public ?string $sensorId,

        #[Rule('nullable', 'required_with:below,above', 'numeric')]
        public $allowed,

        #[Rule('nullable', 'numeric')]
        public $below,

        #[Rule('nullable', 'numeric')]
        public $above,
    ) {}

    public static function messages(): array
    {
        return [
            'name.required' => __('Setup/Rooms.validation.name'),
            'type.required' => __('Setup/Rooms.validation.type'),
            'area.required' => __('Setup/Rooms.validation.area'),
            'sensorId.required' => __('Setup/Rooms.validation.sensorId'),
            'allowed.required' => __('Setup/Rooms.validation.allowed'),
        ];
    }

    public static function fromModel(Room $model): self
    {
        return new self(
            id: $model->id,
            companyId: $model->company_id,
            name: $model->name,
            type: $model->type,
            area: $model->area,
            sensorId: $model->sensor_id,
            allowed: $model->allowed,
            below: $model->below,
            above: $model->above,
        );
    }

    public static function rules(): array
    {
        return [
            'name' => [
                'required',
                ValidationRule::unique('rooms')
                    ->where(fn ($query) => $query->where('company_id', request('company_id') ?? selectedCompany()?->id))
                    ->ignore(request('id')),
            ],
        ];
    }
}
