<?php

namespace App\Observers;

use App\Models\CompanyDetail;
use App\Models\FeaturedRole;
use App\Models\Process;
use Spatie\Permission\Models\Role;

class ProcessActivityObserver
{
    public function created(CompanyDetail $company): void
    {
        $processes = [
            [
                'name' => 'Storing Products',
                'description' => null,
                'activities' => [
                    ['name' => 'Chilled', 'description' => 'Storing foods in between -2/+4 cooler', 'is_active' => true],
                    ['name' => 'Frozen', 'description' => 'Storing foods in -18 freezer', 'is_active' => true],
                    ['name' => 'Shock Freezing', 'description' => 'Storing foods in between -40/-60 freezer', 'is_active' => true],
                    ['name' => 'Room Temperature', 'description' => 'Storing foods in between +20/+25 environment', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Purchase the products',
                'description' => null,
            ],
            [
                'name' => 'Fermenting/brining',
                'description' => null,
            ],
            [
                'name' => 'Transportation of food with company vehicle',
                'description' => null,
                'activities' => [
                    ['name' => 'Chilled', 'description' => 'Transportation of chilled food', 'is_active' => true],
                    ['name' => 'Frozen', 'description' => 'Transportation of frozen food', 'is_active' => true],
                    ['name' => 'Room Temp', 'description' => 'Transportation of food at room temperature', 'is_active' => true],
                    ['name' => 'over +63 °C / 145 °F', 'description' => 'Transportation of hot food', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Sale/Serving of food on site',
                'description' => 'incl. packaging in the presence of customer, hot storing',
                'activities' => [
                    ['name' => 'incl. over +63 °C/145 °F', 'description' => 'Selling/serving hot food within the
                      business unit', 'is_active' => true],
                    ['name' => 'incl. chilled', 'description' => 'Serving/selling chilled food within the business unit', 'is_active' => true],
                    ['name' => 'Sale/serving into customers package', 'description' => 'bag, box, cup, etc', 'is_active' => true],
                    ['name' => 'Frozen', 'description' => 'Serving / selling frozen food in the company', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Food Donation',
                'description' => null,
                'activities' => [
                    ['name' => 'Use by', 'description' => 'Donating "Use by" food', 'is_active' => true],
                    ['name' => 'Best before', 'description' => 'Donating "Best before" food', 'is_active' => true],
                    ['name' => 'No shelf-life date', 'description' => 'Donating food which doesnt need a shelf-life date', 'is_active' => true],
                    ['name' => 'Freezing for donation', 'description' => 'Freezing food for donating it later; allows to
                     extend shelf life if certain conditions are met', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Picking herbal products',
                'description' => 'Picking / growing of berries, mushrooms, fruits, herbs, vegetables',
            ],
            [
                'name' => 'Receiving the products',
                'description' => null,
            ],
            [
                'name' => 'Thawing/defrosting',
                'description' => null,
            ],
            [
                'name' => 'Cleaning of soiled vegetables and fruits',
                'description' => 'Processing of unwashed or partly washed vegetables, e.g. washing potatoes.',
            ],
            [
                'name' => 'Cold pressing',
                'description' => null,
            ],
            [
                'name' => 'Preparing non-animal products/cold processing',
                'description' => 'Cold processing/marinating vegetables, fruits, berries, mushrooms (cutting, grinding, cleaning, pickling)',
            ],
            [
                'name' => 'Preparing animal products/cold processing',
                'description' => 'Cold processing of meat/fish/egg/dairy products (cutting, cleaning, foaming, pickling, etc.)',
            ],
            [
                'name' => 'Cold smoking',
                'description' => null,
            ],
            [
                'name' => 'Cooking',
                'description' => null,
                'activities' => [
                    ['name' => 'incl. sous vide', 'description' => 'Long-term cooking in low temperature in vacuum packages', 'is_active' => true],
                    ['name' => 'incl. deep-frying', 'description' => 'Deep-frying in lot of oil (max +175 °C)', 'is_active' => true],
                    ['name' => 'incl. steaming/poaching/stewing', 'description' => 'Low heat cooking', 'is_active' => true],
                    ['name' => 'incl. frying', 'description' => 'Cooking the food in a greasy pan or on a non-greasy wire
                     rack (160-175 °C)', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Baking',
                'description' => null,
            ],
            [
                'name' => 'Cooling',
                'description' => 'Cooling cooked products, e.g. desserts, semi-prepared or ready-to-eat meals',
            ],
            [
                'name' => 'Deep-freezing',
                'description' => null,
            ],
            [
                'name' => 'Temporary storage',
                'description' => 'Storing of semi-prepared and ready-to-eat products, opened packages or products removed from original packaging',
                'activities' => [
                    ['name' => 'Chilled', 'description' => 'Temporary storing of the chilled food', 'is_active' => true],
                    ['name' => 'Frozen', 'description' => 'Temporary storing of the frozen food', 'is_active' => true],
                    ['name' => 'Room temp.', 'description' => 'Temporary storing at room temperature', 'is_active' => true],
                    ['name' => 'Vacuum packaging for re-storing', 'description' => 'Vacuum packaging to extend shelf-life', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Reheating (incl. semi-prepared products)',
                'description' => 'Cooking ready-to-eat products',
                'activities' => [
                    ['name' => 'Cooking products until boiling', 'description' => 'Heating the ingredients in liquid until
                      the liquid is boiling', 'is_active' => true],
                    ['name' => 'incl. cooking', 'description' => 'Re-heating ready-to-eat food
                     ', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Packaging/labelling',
                'description' => 'Industrial packaging or packaging used on production premises',
                'activities' => [
                    ['name' => 'incl. reduced oxygen packaging (ROP)', 'description' => 'Vacuum pack, modified
                    atmosphere pack, controlled atmosphere, sous vide and cook-chill packaging', 'is_active' => true],
                    ['name' => 'incl. modified atmosphere packaging (MAP)', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Sale/serving of food outside of the company premises',
                'description' => 'Incl. catering (food is served by your company)',
                'activities' => [
                    ['name' => 'incl. over +63 °C/145 °F', 'description' => 'Serving/selling hot food off the business
                      unit premises', 'is_active' => true],
                    ['name' => 'incl. chilled', 'description' => '“incl. serving/selling chilled food off the business unit
                      premises', 'is_active' => true],
                    ['name' => 'Sale/serving/packing into customers package', 'description' => 'bag, box, cup, etc', 'is_active' => true],
                    ['name' => 'Frozen', 'description' => 'Serving/selling frozen food off company premises', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Food/products are delivered without serving',
                'description' => 'Food/products are delivered without serving',
            ],
            [
                'name' => 'Hunting/fishing/raising animals',
                'description' => 'Raising / hunting / fishing animals,
                  fishes, bees, birds, bugs, reptiles, etc.',
                'activities' => [
                    ['name' => 'incl. killing animals', 'is_active' => true],
                ],
            ],
            [
                'name' => 'Steeping',
                'description' => null,
            ],
            [
                'name' => 'Marination/pickling',
                'description' => null,
            ],
            [
                'name' => 'Weighing',
                'description' => null,
            ],
            [
                'name' => 'Mixing',
                'description' => null,
            ],
            [
                'name' => 'Drying',
                'description' => 'Removing water from a solid, liquid or gaseous substance',
            ],
            [
                'name' => 'Roasting',
                'description' => null,
            ],
            [
                'name' => 'Milling/Grinding',
                'description' => null,
            ],
            [
                'name' => 'Brewing / boiling',
                'description' => null,
            ],
            ['name' => 'Hot holding/serving in marinade',
                'description' => null,
            ],
            [
                'name' => 'Sale/serving of food to another company',
                'description' => 'Food/products are delivered without serving',
            ],
            [
                'name' => 'Curing',
                'description' => null,
                'activities' => [
                    ['name' => 'Dry curing', 'description' => 'Curing with salt or flavours mix', 'is_active' => true],
                    ['name' => 'Wet curing', 'description' => 'Curing with injection or in salt solution', 'is_active' => true],
                    ['name' => 'Combination curing', 'description' => 'Curing with injection and rubbing with curing mix', 'is_active' => true],
                ],

            ],

        ];

        foreach ($processes as $processData) {
            Process::create([
                'name' => $processData['name'],
                'description' => $processData['description'],
                'activities' => isset($processData['activities'])
                    ? json_encode($processData['activities'])
                    : null,
                'company_id' => $company->id,
                'is_active' => true,
            ]);
        }

    }

}
