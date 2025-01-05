<?php

namespace App\Http\Controllers\Admin;

use App\Data\MainCustomer\MainCustomerArrayData;
use App\Data\MainCustomer\MainCustomerData;
use App\Http\Controllers\Controller;
use App\Models\MainCustomer;
use App\Repositories\CustomerGroupRepository;
use App\Services\CustomerGroupService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MainCustomerGroupController extends Controller
{
    public function __construct(protected CustomerGroupRepository $repository,
        protected CustomerGroupService $service
    ) {}

    public function index(Request $request)
    {
        return Inertia::render('Admin/MainCustomer/Index', [
            'customers' => $this->repository->getMainCustomer($request->get('per_page', 10)),
        ]);
    }

    public function store(MainCustomerArrayData $data)
    {
        $this->service->store($data);

        return back()->with([
            'message' => 'Main Customer Group Created Successfully',
            'type' => 'success',
        ]);

    }

    public function update(MainCustomerData $data)
    {
        $this->service->update($data);

        return back()->with([
            'message' => 'Customer Group Name Updated Successfully',
            'type' => 'success',
        ]);
    }

    public function destroy(MainCustomer $main_customer)
    {
        $this->service->delete($main_customer);

        return back()->with([
            'message' => 'Customer Group Deleted Successfully',
            'type' => 'success',
        ]);
    }
}
