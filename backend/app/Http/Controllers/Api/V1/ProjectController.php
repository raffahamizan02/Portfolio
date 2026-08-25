<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request) 
    {
        $query = Project::with('technologies');

        if ($request->has('featured')) {
            $query->where('is_featured', $request->boolean('featured'));
        }

        if ($request->has('tech')) {
            $query->whereHas('technologies', function ($q) use ($request) {
                $q->where('technologies.id', $request->tech);
            });
        }

        return response()->json($query->latest()->get());
    }

    public function show($slug) 
    {
        $project = Project::with('technologies')->where('slug', $slug)->firstOrFail();
        return response()->json($project);
    }
}