<?php

namespace Database\Seeders;

use App\Models\StdCode;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;

class StdCodesSeeder extends Seeder
{
    public function run()
    {

        StdCode::create([
            'stdcode' => '+90',
            'country' => 'TR',
        ]);
        
        $response = Http::timeout(400)->get('https://restcountries.com/v3.1/all', [
            'fields' => 'cca2,idd',
        ]);
        if ($response->successful()) {
            $countries = $response->json();
            $codes = [];
            foreach ($countries as $country) {
                if (! empty($country['cca2']) && ! empty($country['idd']['root']) && ! empty($country['idd']['suffixes'][0])) {
                    $stdcode = $country['idd']['root'].$country['idd']['suffixes'][0];
                    $codes[] = [
                        'stdcode' => $stdcode,
                        'country' => $country['cca2'],
                    ];
                }
            }
            foreach ($codes as $code) {
                StdCode::create($code);
            }
        } else {
            $this->command->error('Failed to fetch data from the API.');
        }
    }
}
