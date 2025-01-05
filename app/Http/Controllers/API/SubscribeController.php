<?php

namespace App\Http\Controllers\API;

use App\Data\API\SubscribeData;
use App\Http\Controllers\Controller;
use App\Services\API\SubscriptionService;

class SubscribeController extends Controller
{
    public function __construct(
        protected SubscriptionService $service) {}

    public function store(SubscribeData $data)
    {
        $this->service->store($data);

        return response()->json(['message' => 'Subscription Done Successfully'], 201);
    }
}
