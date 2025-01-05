<?php

namespace App\Data\Traceability;

use Spatie\LaravelData\Attributes\MapName;
use Spatie\LaravelData\Attributes\Validation\Rule;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
#[MapName(SnakeCaseMapper::class)]
class PreparedProductArrayData extends Data
{
    public function __construct(

        public ?int $id,

        #[Rule(['required'])]
         /**
         * @var PreparedProductData[]
         */

        public int $companyId,

        public int $productId,

        public string $batchCode,

        public int $amount,

        public string $comment,

        public string $expiryDate,

        public string $expiryTime,

        public array $ingredients,
    ) {}

    public static function messages(): array
    {
        return [
            'ingredients' => __('Please fill required fields'),
        ];
    }
}
