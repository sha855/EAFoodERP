<?php

namespace Database\Seeders;

use App\Models\MainCustomer;
use Illuminate\Database\Seeder;

class MainCustomerSeeder extends Seeder
{
    public function run(): void
    {
        $customers = [
            'Adults',
            'Infants',
            'Pre-School',
            'Students (Primary, Basic, Secondary, and Higher Education)',
            'People with impaired immune system (Sick, Elderly)',
            'Prisoners',
            'People In Military',
            'Homeless',
            'Selling to another companies',
        ];

        foreach ($customers as $customer) {
            MainCustomer::create(['name' => $customer]);
        }
    }
}
