<?php

namespace App\Http\Controllers\API;

use App\Data\API\BusinessUserData;
use App\Data\API\ContactUsData;
use App\Http\Controllers\Controller;
use App\Repositories\BusinessUnitRepository;
use App\Services\UserService;

class UserController extends Controller
{
    public function __construct(
        protected UserService $service,
        protected BusinessUnitRepository $businessUnit
    ) {}

    public function store(ContactUsData $data)
    {
        $this->service->storeContactUser($data);

        return response()->json(['message' => 'Thank you for contact us we will reach back to you soon'], 201);
    }

    public function businessDetail()
    {
        return $this->businessUnit->getBusinessDetail();
    }

    public function storeBusinessUser(BusinessUserData $data)
    {
        $this->service->storeBusinessUser($data);

        return response()->json(['message' => 'Thank you for contact us we will reach back to you soon'], 201);
    }
}
