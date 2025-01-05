<?php

namespace App\Data\Setup;

use App\Models\Equipment;
use Illuminate\Validation\Rule as ValidationRule;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class EquipmentData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string')]
        public string $name,

        #[Rule('nullable', 'string')]
        public ?string $sensorId,

        #[Rule('required', 'string')]
        public $type,

        #[Rule('required')]
        public $roomId,

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
            'name.required' => __('Setup/Equipment.validation.name'),
            'sensorId.required' => __('Setup/Equipment.validation.sensorId'),
            'type.required' => __('Setup/Equipment.validation.type'),
            'room_id.required' => __('Setup/Equipment.validation.roomId'),
            'allowed.required' => __('Setup/Equipment.validation.allowed'),
        ];
    }

    public static function fromModel(Equipment $model): self
    {
        return new self(
            id: $model->id,
            name: $model->name,
            sensorId: $model->sensor_id,
            type: $model->type,
            roomId: $model->room_id,
            allowed: $model->below,
            below: $model->above,
            above: $model->allowed,
        );
    }

    public static function rules(): array
    {
        return [
            'name' => [
                'required',
                ValidationRule::unique('equipment')
                    ->where(fn ($query) => $query->where('company_id', request('company_id') ?? selectedCompany()?->id))
                    ->ignore(request('id')),
            ],
        ];
    }
}
