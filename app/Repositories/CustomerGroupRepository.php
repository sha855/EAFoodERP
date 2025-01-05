<?php

namespace App\Repositories;

use App\Models\MainCustomer;

class CustomerGroupRepository
{
    public function getMainCustomer(int $perPage = 10)
    {
        return MainCustomer::orderBy('id', 'desc')->
            paginate($perPage);
    }

    public function getAllMainCustomer()
    {
        return MainCustomer::orderBy('id', 'desc')->get();
    }
}
