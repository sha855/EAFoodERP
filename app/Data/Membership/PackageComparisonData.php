<?php

namespace App\Data\Membership;

use App\Models\PackageComparison;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PackageComparisonData extends Data
{
    public function __construct(
        #[Rule('nullable')]
        public ?int $id,

        #[Rule('required', 'integer', 'min:1')]
        public int $featureId,

        #[Rule('required', 'integer', 'min:1')]
        public int $featureHeadingId,

        #[Rule('required', 'array')]
        public array $isActive,

        #[Rule('nullable', 'array')]
        public ?array $optionalAct,

        #[Rule('required', 'array')]
        public array $packageId,
    ) {}

    public static function fromModel(PackageComparison $package): self
    {
        return new self(
            id : $package->id,
            featureHeadingId : $package->feature_heading_id,
            featureId : $package->feature_id,
            isActive : $package->is_active,
            optionalAct : $package->optional_act,
            packageId : $package->package_id,
        );
    }

    public static function messages(): array
    {
        return [
            'featureId.required' => __('validation/PackageComparison.featureId.required'),
            'featureId.integer' => __('validation/PackageComparison.featureId.integer'),
            'featureId.min' => __('validation/PackageComparison.featureId.min'),

            'featureHeadingId.required' => __('validation/PackageComparison.featureHeadingId.required'),
            'featureHeadingId.integer' => __('validation/PackageComparison.featureHeadingId.integer'),
            'featureHeadingId.min' => __('validation/PackageComparison.featureHeadingId.min'),

            'isActive.required' => __('validation/PackageComparison.isActive.required'),
            'isActive.array' => __('validation/PackageComparison.isActive.array'),

            'optionalAct.nullable' => __('validation/PackageComparison.optionalAct.nullable'),
            'optionalAct.array' => __('validation/PackageComparison.optionalAct.array'),

            'packageId.required' => __('validation/PackageComparison.packageId.required'),
            'packageId.array' => __('validation/PackageComparison.packageId.array'),
        ];
    }
}
