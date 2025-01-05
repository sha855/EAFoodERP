<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApiController extends Controller
{
    public function dataStore(Request $request)
    {
        Log::info($request->all());

        return response()->json(['message' => 'Dummy Post Data received Successfully!'], 200);
    }

    public function printerStore(Request $request)
    {
        Log::info($request->all());

        return response()->json(['message' => 'Printer Post Data received Successfully!'], 200);
    }
}
