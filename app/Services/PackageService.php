<?php

namespace App\Services;

use App\Data\Membership\FeatureHeadingArrayData;
use App\Data\Membership\FeatureHeadingData;
use App\Data\Membership\PackageComparisonData;
use App\Data\Membership\PackageData;
use App\Data\Membership\PackageFeatureArrayData;
use App\Data\Membership\PackageFeatureData;
use App\Models\FeatureHeading;
use App\Models\Package;
use App\Models\PackageComparison;
use App\Models\PackageDetail;
use App\Models\PackageFeature;

class PackageService
{
    public function create(PackageData $data)
    {
        $package = Package::create($data->toArray());
        if ($data->yearlySaving) {
            Package::where('yearly_saving')->update([
                'yearly_saving' => $data->yearlySaving,
            ]);
        }
        PackageDetail::create([
            'package_id' => $package->id,
            'details' => $data->details,
        ]);

        return $package;
    }

    public function update(PackageData $data, $membership)
    {
        $package = Package::findOrfail($membership);
        $packageDetail = PackageDetail::where('package_id', $membership)->first();
        if ($data->yearlySaving) {
            Package::where('yearly_saving')->update([
                'yearly_saving' => $data->yearlySaving,
            ]);
        }
        $packageDetail->update($data->toArray());
        $package->update($data->toArray());

        return $data;
    }

    public function delete(Package $membership)
    {
        return $membership->delete();
    }

    public function createFeature(PackageFeatureArrayData $data)
    {

        foreach ($data->features as $feature) {
            PackageFeature::create([
                'feature_heading_id' => $data->featureHeading,
                'feature_name' => $feature->featureName,
                'feature_description' => $feature->featureDescription,
            ]);
        }
    }

    public function featureUpdate(PackageFeatureData $data)
    {
        return PackageFeature::where('id', $data->id)->update($data->toArray());
    }

    public function deleteFeature(PackageFeature $feature)
    {
        return $feature->delete();
    }

    public function createPackageComparison(PackageComparisonData $data)
    {
        foreach ($data->packageId as $packageId) {
            $isActive = in_array($packageId, $data->isActive) ? 1 : 0;
            $optionalAct = $data->optionalAct[$packageId] ?? null;
            PackageComparison::updateOrcreate([
                'package_id' => $packageId,
                'feature_id' => $data->featureId,
            ], ['feature_heading_id' => $data->featureHeadingId,
                'is_active' => $isActive,
                'optional_act' => $optionalAct,
            ]);
        }
    }

    public function updateComparison(PackageComparisonData $data)
    {
        $activeStatus = collect($data->isActive)->first();
        $optionalAct = collect($data->optionalAct)->first();

        return PackageComparison::where('id', $data->id)->update([
            'is_active' => $activeStatus,
            'optional_act' => $optionalAct,
        ]);
    }

    public function deletePackageComparison(PackageComparison $feature_comparison)
    {
        return $feature_comparison->delete();
    }

    public function createFeatureHeading(FeatureHeadingArrayData $data)
    {
        foreach ($data->featureHeading as $heading) {
            FeatureHeading::create($heading->toArray());
        }
    }

    public function updateFeatureHeading(FeatureHeadingData $data)
    {
        $firstFeatureHeading = collect($data->featureHeading)->first();

        return FeatureHeading::where('id', $data->id)->update([
            'feature_heading' => $firstFeatureHeading,
        ]);
    }

    public function deleteFeatureHeading(FeatureHeading $feature_heading)
    {
        return $feature_heading->delete();
    }
}
