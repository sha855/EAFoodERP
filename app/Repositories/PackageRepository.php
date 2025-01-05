<?php

namespace App\Repositories;

use App\Data\Membership\PackageData;
use App\Models\FeatureHeading;
use App\Models\Package;
use App\Models\PackageComparison;
use App\Models\PackageFeature;

class PackageRepository
{
    public function getAllPackages(int $perPage = 10)
    {
        return Package::with('details')->orderBy('id', 'desc')->paginate($perPage);
    }

    public function getPackageData()
    {
        $packages = Package::with('details')->get();
        $packageData = [];
        foreach ($packages as $package) {
            $packageData[] = PackageData::fromModel($package);
        }

        return $packageData;
    }

    public function getFeatureComparison(int $perPage = 10)
    {
        return PackageComparison::with('featurePackage', 'package')->orderBy('id', 'desc')->paginate($perPage);
    }

    public function getPlanComparison()
    {
        $features = PackageComparison::with(['package', 'featurePackage', 'featureHeading'])->get();

        $groupedData = $features->groupBy(fn ($element) => $element->package->name);

        return $groupedData;
    }

    public function getPackageById(Package $membership)
    {
        return $membership->load('details');
    }

    public function getFeatures(int $perPage = 10)
    {
        return PackageFeature::with('featureHeading')->orderBy('id', 'desc')->paginate($perPage);
    }

    public function getFeaturesHeading(int $perPage = 10)
    {
        return FeatureHeading::orderBy('id', 'desc')->paginate($perPage);

    }

    public function getAllFeaturesHeading()
    {
        return FeatureHeading::all();
    }

    public function getPlansFeature()
    {
        return FeatureHeading::with('details')->get();
    }
}
