<?php

namespace Tests\Feature;

use App\Models\FoodBusinessType;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompanyRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_company_can_be_registered(): void
    {
        $user = User::factory()->create();

        $businessType = FoodBusinessType::create(['name' => 'Test Business Type', 'description' => 'the example description']);

        $this->actingAs($user);
        $response = $this->post('/register-company', [
            'user_id' => $user->id,
            'company_name' => 'Test Company',
            'email' => 'test@example.com',
            'business_type_id' => $businessType->id,
            'country_name' => 'US',
            'state' => 'CA',
            'total_no_of_employees' => '1-10',
            'total_no_of_business_locations' => '1-5',
        ]);

        $response->assertStatus(201);

        $this->assertDatabaseHas('company_details', [
            'company_name' => 'Test Company',
            'email' => 'test@example.com',
            'user_id' => $user->id,
        ]);
    }
}
