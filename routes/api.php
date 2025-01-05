<?php

use App\Http\Controllers\API\ApiController;
use App\Http\Controllers\API\MembershipController;
use App\Http\Controllers\API\SubscribeController;
use App\Http\Controllers\API\UserController;
use App\Repositories\SettingRepository;
use Illuminate\Support\Facades\Route;

Route::get('owlly/setting', [SettingRepository::class, 'getToken']);

Route::middleware(['token_match'])->prefix('api')->group(function () {
    Route::get('setting', [SettingRepository::class, 'getSettingData']);
    Route::post('subscribe', [SubscribeController::class, 'store']);
    Route::post('contact-us', [UserController::class, 'store']);
    Route::get('business-detail', [UserController::class, 'businessDetail']);
    Route::post('business-user', [UserController::class, 'storeBusinessUser']);
    Route::get('data', [MembershipController::class, 'index']);
    Route::get('plans-feature', [MembershipController::class, 'plansFeature']);
    Route::post('dummy-endpont', [ApiController::class, 'dataStore']);
    Route::post('printer-endpoint', [ApiController::class, 'printerStore']);
});
