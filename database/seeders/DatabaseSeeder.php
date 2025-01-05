<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {

        $adminRole = Role::create(['name' => 'admin']);
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => bcrypt('password'),
        ]);
        $admin->assignRole($adminRole);

        $userRole = Role::create(['name' => 'user']);
        $user = User::create([
            'name' => 'David',
            'email' => 'user@example.com',
            'email_verified_at' => now(),
            'phone_no' => 9999999999,
            'std_code' => +1,
            'password' => bcrypt('password'),
        ]);
        $user->assignRole($userRole);

        $this->call([
            FoodBusinessTypeSeeder::class,
            AdditionalBusinessSeeder::class,
            MainCustomerSeeder::class,
            TaskSeeder::class,
            CompanyDetailSeeder::class,
            RolesTableSeeder::class,
            PackageSeeder::class,
            FoodBusinessUnitSeeder::class,
           // ProcessAndProcessActivitySeeder::class,
            WorkGroupTaskSeeder::class,
            AnalysesTaskSeeder::class,
            CompanyAnalysesTaskSeeder::class,
            IngredientSeeder::class,
            IngredientTypeSeeder::class,
            FoodProductSeeder::class,
            BusinessUnitFoodProductSeeder::class,
            MeasuringUnitsSeeder::class,
            StdCodesSeeder::class,
            ProductIngredientSeeder::class,
            AdminSettingSeeder::class,
        ]);
    }
}
