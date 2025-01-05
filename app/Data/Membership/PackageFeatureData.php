<?php

namespace App\Data\Membership;

use App\Models\PackageFeature;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PackageFeatureData extends Data
{
    public function __construct(
        #[Rule('nullable')]
        public ?int $id,

        public ?int $featureHeadingId,

        #[Rule('required', 'string', 'max:255')]
        public string $featureName,

        #[Rule('required', 'string')]
        public string $featureDescription,
    ) {}

    public static function fromModel(PackageFeature $package): self
    {
        return new self(
            id : $package->id,
            featureHeadingId : $package->feature_heading_id,
            featureName : $package->feature_name,
            featureDescription : $package->feature_description
        );
    }

    public static function messages(): array
    {
        return [
            'featureName.required' => __('Validation/PackageFeature.featureName.required'),
            'featureName.string' => __('Validation/PackageFeature.featureName.string'),
            'featureName.max' => __('Validation/PackageFeature.featureName.max'),

            'featureDescription.required' => __('Validation/PackageFeature.featureDescription.required'),
            'featureDescription.string' => __('Validation/PackageFeature.featureDescription.string'),

            'featureHeadingId.required' => __('Validation/PackageFeature.featureHeadingId.required'),
            'featureHeadingId.integer' => __('Validation/PackageFeature.featureHeadingId.integer'),
        ];
    }
}
