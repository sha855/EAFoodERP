<?php

namespace Database\Seeders;

use App\Models\Package;
use App\Models\PackageDetail;
use Illuminate\Database\Seeder;

class PackageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $packages = [
            [
                'name' => 'Basic',
                'description' => 'Get your HACCP Plan in 1 hour and start with food safety',
                'annually_price' => 49.99,
                'annually_discounted_price' => 39.99,
                'monthly_price' => 0.00,
                'monthly_discounted_price' => 0.00,
                'is_active' => true,
            ],
            [
                'name' => 'Standard',
                'description' => 'HACCP-based Food Safety System set in 15 minutes',
                'annually_price' => 99.99,
                'annually_discounted_price' => 79.99,
                'monthly_price' => 9.99,
                'monthly_discounted_price' => 7.99,
                'is_active' => true,
            ],
            [
                'name' => 'Professional',
                'description' => 'Fully transparent Food Safety System with traceability',
                'annually_price' => 199.99,
                'annually_discounted_price' => 149.99,
                'monthly_price' => 19.99,
                'monthly_discounted_price' => 14.99,
                'is_active' => true,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'Tailored solution',
                'annually_price' => 0.0,
                'annually_discounted_price' => 0.0,
                'monthly_price' => 0.0,
                'monthly_discounted_price' => 0.0,
                'is_active' => true,
            ],
        ];

        foreach ($packages as $packageData) {
            $package = Package::create($packageData);
            PackageDetail::create([
                'package_id' => $package->id,
                'details' => 'Details about '.$package->name,
            ]);
        }
    }
}
