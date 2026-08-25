<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Technology;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name'      =>  'Muhammad Abhiraffa Hamizan',
            'email'     =>  'admin@portfolio.com',
            'password'  =>  Hash::make('admin12345'),
        ]);

        $technologies = [
            ['name' =>  'Vue.js 3', 'category'      =>  'frontend'],
            ['name' =>  'Tailwind CSS', 'category'  =>  'frontend'],
            ['name' =>  'Laravel 11', 'category'    =>  'backend'],
            ['name' =>  'MySQL', 'category'         =>  'database'],
            ['name' =>  'Vite', 'category'          =>  'tools'],
        ];

        foreach ($technologies as $tech) {
            Technology::create($tech);
        }

        $project = Project::create([
            'title'         => 'Personal Portfolio Website',
            'slug'          => 'personal-portfolio-website',
            'summary'       => 'Decoupled Full-Stack SPA menggunakan Laravel 11 dan Vue.js 3.',
            'content'       => "## Overview\nProyek ini dibangun menggunakan decoupled architecture...\n\n## Fitur\n- REST API Backend\n- Vue.js 3 Frontend SPA",
            'thumbnail_url' => 'https://placehold.co/600x400/png',
            'demo_url'      => 'http://localhost:5173',
            'github_url'    => 'https://github.com/raffahamizan02/Portfolio.git',
            'is_featured'   => true,
        ]);

        $project->technologies()->attach([1, 2, 3, 4, 5]);
    }
}
