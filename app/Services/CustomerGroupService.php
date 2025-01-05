<?php

namespace App\Services;

use App\Data\MainCustomer\MainCustomerArrayData;
use App\Data\MainCustomer\MainCustomerData;
use App\Models\MainCustomer;

class CustomerGroupService
{
    public function store(MainCustomerArrayData $data)
    {
        foreach ($data->mainCustomer as $customer) {
            MainCustomer::create($customer->toArray());
        }

        return $data->mainCustomer;
    }

    public function update(MainCustomerData $data)
    {
        return MainCustomer::where('id', $data->id)->update([
            'name' => $data->name,
        ]);
    }

    public function delete(MainCustomer $main_customer)
    {
        return $main_customer->delete();
    }
}
