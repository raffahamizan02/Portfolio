<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Technology;

class TechnologyController extends Controller
{
    public function index()
    {
        return response()->json(Technology::all());
    }
}