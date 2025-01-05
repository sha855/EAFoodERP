<?php

namespace Database\Seeders;

use App\Models\FoodBusinessType;
use Illuminate\Database\Seeder;

class FoodBusinessTypeSeeder extends Seeder
{
    public function run(): void
    {
        $foodBusinessTypes = [
            [
                'name' => 'Accommodation Company',
                'description' => 'Hotels, Motels, Resorts, Cruise Ships, Guesthouses and Bed & Breakfasts, Hostels, Vacation Rentals, Serviced Apartments, Lodges, Camping and Glamping, Holiday Parks and Caravan Parks, Boutique Inns, Farm Stays, Capsule Hotels, Eco-Lodges and Eco-Resorts, Floating Accommodations, Specialty Lodging and Specifically Following Outlets of an Accomodation Company:
                    Hotel Restaurants / F&B Outlets: In-house dining options for hotel guests and visitors.
                    Room Service: In-room dining available to hotel guests.
                    Banquet and Event Catering: Event dining hosted by the hotel or resort.
                    Poolside and Beach Bars: Casual dining options at pools or beaches in resorts.
                    ',
            ],
            [
                'name' => 'Food Service Company (Independent and A la Carte Menu Providing)',
                'description' => 'Cafes, Restaurants, Bars and Lounges
                    Fine Dining Restaurants: High-end service, gourmet cuisine.
                    Casual Dining Restaurants: Relaxed atmosphere, diverse menu.
                    Fast Food Restaurants: Quick-service, standardized menu items.
                    Cafés and Coffee Shops: Specializing in coffee, tea, light snacks, and pastries.
                    Buffet Restaurants: Self-service dining with a variety of dishes.
                    Bistros and Brasseries: Casual, smaller menus, often French-inspired.
                    Pop-Up Restaurants: Temporary restaurants offering unique, often themed, menus.
                    Supper Clubs: Private dining experiences, often with unique or themed menus.
                    Private Clubs: Member-only dining and catering.
                    Bars: Focus on alcoholic beverages, with some bar snacks.
                    Wine Bars: Specialize in wines and often offer charcuterie or tapas.
                    Pubs: Casual atmosphere with food and a variety of beers on tap.
                    Cocktail Lounges: Relaxed atmosphere, specializing in cocktails.
                    Taprooms and Breweries: Often serve beer brewed on-site with limited food options.
                    Bakeries: Focus on baked goods like bread, pastries, and cakes.
                    Patisseries: Specialize in French-style pastries and desserts.
                    Ice Cream Parlors and Gelaterias: Offer ice cream, gelato, and frozen treats.
                    Juice Bars and Smoothie Shops: Specialize in fresh juices and smoothies.
                    Delis: Known for sandwiches, prepared foods, and cold cuts.
                    Confectioneries: Focus on sweets, chocolates, and candy.
                    Fast-Casual Restaurants: Fresh ingredients with faster service than traditional dining.
                    Drive-Thru Fast Food: Quick-service with drive-thru for convenience.
                    Take-Out Only: Establishments focusing solely on to-go orders.
                    Food Courts: Located in malls, airports, and large buildings with multiple food options.
                    Public Market Halls: Indoor spaces offering diverse food vendors and small restaurants.
                    Ferry and Boat Cafeterias: Limited dining options on ferries and boats.
                    Other Transportation-Based Food Service
                    ',
            ],
            [
                'name' => 'Institutional Food Production & Catering Services',
                'description' => 'Hospital Cafeterias: Provide meals for patients, staff, and visitors.
                    School and University Dining Services: Cater to students, staff, and faculty.
                    Military Mess Halls: Dining facilities for military personnel.
                    Correctional Facility Kitchens: Food service for inmates in prisons.
                    Corporate Cafeterias: On-site dining for employees at large corporations.
                    Nursing Home and Senior Living Dining: Catered meals for senior residents.
                    Transportation-Based Food Service: 
                    Airline Catering: In-flight meals and refreshments for airline passengers.
                    Train Dining Cars: Food service offered on long-distance trains.
                    Cruise Ship Dining: Multiple dining options available to cruise passengers.
                    Ferry and Boat Cafeterias: Limited dining options on ferries and boats.
                    ',
            ],
            [
                'name' => 'Banquet Specific Food Production & Outside Catering Services',
                'description' => 'Companies of banquet-based food production, transportation, and services including following ones:
                    Event Catering: Catering for weddings, corporate events, private parties.
                    Corporate Catering: Meal services for offices and corporate events.
                    Private Chef Services: Personalized chef services in private homes or small events.',
            ],
            [
                'name' => 'Temporary Food Establishment',
                'description' => "Temporary food establishments are typically set up for short-term events and often operate with specific guidelines for food safety. Here are the main types:
                Any type of Event-Based Company (Except Banquet Services)
                Food Booths and Stalls: 
                Common at fairs, festivals, farmers' markets, and public gatherings.
                Usually set up in tents, kiosks, or small portable structures.
                Food Trucks and Mobile Food Units
                Includes food trucks, trailers, and carts that can travel to different locations.
                Often serves events like street fairs, concerts, and sports events.
                Concession Stands
                Typically located at sporting events, amusement parks, and entertainment venues.
                May offer pre-packaged foods, snacks, and quick-service items.
                Pop-Up Restaurants and Dining Events
                Temporary restaurants or dining experiences created in unique locations.
                Often appear for a limited time or event, providing a unique or themed dining experience.
                Catering Tents for Events
                Set up by catering companies at weddings, corporate gatherings, or private parties.
                Typically involves a temporary kitchen space with prepared or ready-to-serve foods.
                Farmers’ Market Vendors
                Vendors at farmers’ markets selling prepared or packaged foods.
                These can range from fresh produce to prepared items like baked goods or jams.
                Sampling Booths
                Common in supermarkets, festivals, or food expos.
                Offer small samples of food or beverage products to promote new items.
                Food Sampling Stations at Trade Shows and Expos
                Typically part of larger events where companies sample and promote their food products.
                Often involves single-serve or individually packaged samples.
                Fundraising Food Stands
                Often organized by schools, charities, or community groups.
                These stands may sell baked goods, meals, or snacks for a limited time to raise funds.
                Event-Specific Food Services
                Concession Stands: Often found at stadiums, fairs, and festivals with quick-service items.
                Banquet Halls and Convention Centers: In-house catering for events and gatherings.
                ",
            ],
            [
                'name' => 'Food Services in Portable Vehicle',
                'description' => 'Permanent food establishments are typically set up to operate with specific guidelines for food safety. Here are the main types:
                        Food Trucks: Mobile food service that varies in cuisine, often operates at events.
                        Food Carts and Stalls: Smaller units found at fairs, parks, and streets.
                        Mobile Coffee Trucks: Coffee service from a mobile unit',
            ],
            [
                'name' => 'Retail Food Sales & Services',
                'description' => 'Supermarkets and Other Types of Retail Food Sales Points
                    Vending and Automated Food Services
                    Vending Machines: Provide snacks, drinks, and sometimes hot food.
                    Automated Kiosks: Touchscreen-based kiosks that prepare or dispense food.
                    Micro-Markets: Unattended, self-serve markets often found in corporate offices.
                    Transportation-Based Food Service 
                    Ferry and Boat Cafeterias: Retail  Food Sales on ferries and boats.
                    Other Transportation-Based Retail  Food Sales
                    ',
            ],
            [
                'name' => 'Food Production Plant',
                'description' => 'Any type of packaged food production facilities.',
            ],
            [
                'name' => 'Transportation of Food (Logistics)',
                'description' => 'Any type of food transportation companies.',
            ],
            [
                'name' => 'Food Storage / Wholesale',
                'description' => 'Any type of food transtorage and / or wholesale companies.',
            ],
            [
                'name' => 'Farming',
                'description' => 'Any type of farming companies / facilities.',
            ],
        ];

        foreach ($foodBusinessTypes as $businessType) {
            FoodBusinessType::firstOrCreate(
                ['name' => $businessType['name']],
                ['description' => $businessType['description']]
            );
        }
    }
}
