<?php

namespace App\Http\Controllers\Traceability;

use App\Data\Traceability\ConsumerInfoData;
use App\Data\Traceability\CustomMeasuringUnitData;
use App\Enums\TraceAllergensEnum;
use App\Http\Controllers\Controller;
use App\Models\MeasuringUnit;
use App\Models\ProductRecipe;
use App\Repositories\TraceabilityRepository;
use App\Repositories\UserRepository;
use App\Services\TraceabilityService;
use Inertia\Inertia;

class CustomMeasureController extends Controller
{
    public function __construct(protected TraceabilityService $traceabilityService,
    protected TraceabilityRepository $traceabilityRepository,
    protected UserRepository $userRepository,) {}

    public function customMeasuringUnits()
    {
        $units = MeasuringUnit::all();

        return Inertia::render('TraceAbility/CustomMeasuringUnit', [
            'units' => $units,
        ]);
    }

    public function customMeasuringUnitsEdit()
    {
        $units = MeasuringUnit::all();
        return Inertia::render('TraceAbility/CustomMeasuringUnitEdit', [
            'units' => $units,
        ]);
    }

    public function storeCustomMeasuringUnitsEdit(CustomMeasuringUnitData $request)
    {
        $this->traceabilityService->storeCustomMeasuringUnits($request);
        return to_route('custom-units')->with('success', 'Measuring unit saved successfully!');
    }

}
