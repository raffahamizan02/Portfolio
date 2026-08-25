<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\InquiryController;
use App\Http\Controllers\Api\V1\ProjectController;
use App\Http\Controllers\Api\V1\TechnologyController;
use App\Models\Technology;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);
    Route::get('/technologies', [TechnologyController::class, 'index']);

    Route::post('/contact', [InquiryController::class, 'store'])->middleware('throttle:3,1');

    Route::post('/auth/login', [AuthController::class, 'login']);
});