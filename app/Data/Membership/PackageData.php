<?php

namespace App\Data\Membership;

use App\Models\Package;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class PackageData extends Data
{
    public function __construct(
        #[Rule('nullable', 'integer')]
        public ?int $id,

        #[Rule('required', 'string', 'max:255')]
        public string $name,

        #[Rule('required', 'numeric')]
        public float $annuallyDiscountedPrice,

        #[Rule('required', 'numeric')]
        public float $annuallyPrice,

        #[Rule('required', 'numeric')]
        public float $monthlyPrice,

        #[Rule('required', 'numeric')]
        public float $monthlyDiscountedPrice,

        #[Rule('required', 'string', 'max:255')]
        public string $description,

        #[Rule('required', 'numeric')]
        public float $memberLimit,

        #[Rule('nullable')]
        public ?bool $isTrial,

        #[Rule('nullable')]
        public ?bool $monthly,

        #[Rule('nullable')]
        public ?bool $yearly,

        #[Rule('nullable', 'string')]
        public ?string $yearlySaving,

        #[Rule('required', 'string')]
        public string $details,

    ) {}

    public static function fromModel(Package $package): self
    {
        return new self(
            id: $package->id,
            name: $package->name,
            annuallyDiscountedPrice: $package->annually_discounted_price,
            annuallyPrice: $package->annually_price,
            monthlyPrice: $package->monthly_price,
            monthlyDiscountedPrice: $package->monthly_discounted_price,
            description: $package->description,
            memberLimit: $package->member_limit ?? 0.0,
            isTrial: $package->is_trial,
            monthly: $package->monthly,
            yearly: $package->yearly,
            yearlySaving: $package->yearly_saving,
            details: $package->details->pluck('details')->first(),

        );
    }

    public static function messages(): array
    {
        return [
            'id.integer' => __('Validation/package.id.integer'),
            'annuallyDiscountedPrice.required' => __('Validation/Package.annually_discounted_price.numeric'),
            'annuallyDiscountedPrice.numeric' => __('Validation/Package.annually_discounted_price.numeric'),
            'monthlyDiscountedPrice.required' => __('Validation/Package.monthly_discounted_price.required'),
            'monthlyDiscountedPrice.numeric' => __('Validation/Package.monthly_discounted_price.numeric'),
            'memberLimit.required' => __('Validation/Package.member_limit.required'),
            'memberLimit.numeric' => __('Validation/Package.member_limit.numeric'),
            'monthlyPrice.required' => __('Validation/Package.monthly_price.required'),
            'monthlyPrice.numeric' => __('Validation/Package.monthly_price.numeric'),
            'description.required' => __('Validation/Package.description.required'),
            'description.string' => __('Validation/Package.description.string'),
            'description.max' => __('Validation/Package.description.max'),
            'details.required' => __('Validation/Package.details.required'),
            'details.string' => __('Validation/Package.details.string'),
            'monthly.required' => __('Validation/Package.monthly.required'),
            'monthly.boolean' => __('Validation/Package.monthly.boolean'),
            'yearly.required' => __('Validation/Package.yearly.required'),
            'yearly.boolean' => __('Validation/Package.yearly.boolean'),
            'yearlySaving.string' => __('Validation/Package.yearly_saving.string'),
        ];
    }
}
