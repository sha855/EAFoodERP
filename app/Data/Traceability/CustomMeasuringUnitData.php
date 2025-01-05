<?php

namespace App\Data\Traceability;

use App\Models\MeasuringUnit;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Required;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class CustomMeasuringUnitData extends Data
{
    public function __construct(
        #[Required, Rule('array')]
        public array $units,
    ) {}

    public static function rules(): array
    {
        return [
            'units.*.name' => ['required', 'string'],
            'units.*.symbol' => ['required', 'string'],
            'units.*.value' => ['required', 'numeric'],
        ];
    }

    public static function fromModel(MeasuringUnit $unit): self
    {
        return new self(
            units: [
                [
                    'name' => $unit->name,
                    'symbol' => $unit->symbol,
                    'value' => $unit->value,
                ],
            ]
        );
    }

    public static function messages(): array
    {
        return [
            'units.required' => __('Validation/CustomMeasuringUnit.units.value.required'),
            'units.*.name.required' => __('Validation/CustomMeasuringUnit.units.name.required'),
            'units.*.symbol.required' => __('Validation/CustomMeasuringUnit.units.symbol.required'),
            'units.*.value.required' => __('Validation/CustomMeasuringUnit.units.value.required'),
        ];
    }
}
