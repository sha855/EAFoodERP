<?php

namespace App\Services\API;

use App\Data\API\SubscribeData;
use App\Models\Subscription;

class SubscriptionService
{
    public function store(SubscribeData $data)
    {
        return Subscription::create($data->toarray());
    }
}
