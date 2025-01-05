<?php

namespace App\Data\Membership;

use App\Models\FeatureHeading;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class FeatureHeadingData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string')]
        public string $featureHeading,
    ) {}

    public static function fromModel(FeatureHeading $package): self
    {
        return new self(
            id : $package->id,
            featureHeading : $package->name,
        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Validation/FeatureHeading.id.integer'),
            'featureHeading.required' => __('Validation/FeatureHeading.featureHeading.required'),
            'featureHeading.string' => __('Validation/FeatureHeading.featureHeading.string'),
        ];
    }
}
