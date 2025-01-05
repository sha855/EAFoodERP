<?php

namespace App\Data\API;

use App\Models\Subscription;
use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapName(SnakeCaseMapper::class)]
class SubscribeData extends Data
{
    public function __construct(
        #[Rule('required', 'string', 'max:255')]
        public string $name,

        #[Rule('nullable')]
        public ?string $email,
    ) {}

    /**
     * Create SubscribeData from a Subscribe model instance.
     *
     * @param  Subscribe  $model
     */
    public static function fromModel(Subscription $model): self
    {

        return new self(
            $model->name,
            $model->email,
        );
    }

    public static function messages(): array
    {
        return [
            'name.required' => __('Validation/auditTemplate.name.required'),
            'name.string' => __('Validation/auditTemplate.name.string'),
            'email.required' => __('Validation/userRegistration.email.required'),
            'email.email' => __('Validation/userRegistration.email.email'),
        ];
    }
}
