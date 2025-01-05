<?php

namespace App\Data\MainCustomer;

use App\Models\MainCustomer;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class MainCustomerData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string')]
        public string $name,
    ) {}

    public static function fromModel(MainCustomer $package): self
    {
        return new self(
            id : $package->id,
            name : $package->name,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Validation/FeatureHeading.id.integer'),
            'name.required' => __('Validation/FeatureHeading.featureHeading.required'),
            'name.string' => __('Validation/FeatureHeading.featureHeading.string'),
        ];
    }
}
