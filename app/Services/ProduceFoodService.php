<?php

namespace App\Services;

use App\Data\HaccpPlan\ProducedFoodArrayData;
use App\Data\HaccpPlan\ProductionVolumeArrayData;
use App\Models\CompanyFoodProduct;
use App\Models\OtherProductionVolume;
use App\Models\ProductionVolume;
use App\Repositories\HaccpRepository;

class ProduceFoodService
{
    public function __construct(protected HaccpRepository $repository) {}

    public function productStatusUpdate(ProducedFoodArrayData $data)
    {
        foreach ($data->foodProduct as $food) {
            if ($food->isActive) {

                $existing = $this->repository->existingCompanyFood($food);
                if (! $existing) {
                    CompanyFoodProduct::create($food->toArray());
                }

            } else {
                CompanyFoodProduct::where('company_id', $food->companyId)
                    ->where('food_product_id', $food->foodProductId)
                    ->delete();
            }
        }
    }

    public function updateProductionVolume(ProductionVolumeArrayData $data)
    {
        foreach ($data->foodVolumes as $volumeData) {
            ProductionVolume::updateOrCreate(
                [
                    'food_product_id' => $volumeData->foodProductId,
                    'company_id' => $volumeData->companyId,
                ],
                $volumeData->toArray()
            );
        }
    }

    public function updateOtherProductionVolume(ProductionVolumeArrayData $data)
    {
        foreach ($data->foodVolumes as $volumeData) {
            OtherProductionVolume::updateOrCreate(
                [
                    'food_product_id' => $volumeData->foodProductId,
                    'company_id' => $volumeData->companyId,
                ],
                $volumeData->toArray()
            );
        }
    }
}
