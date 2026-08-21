<?php

namespace Database\Seeders;

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
            'email'     =>  'raplhy@portfolio.com',
            'password'  =>  Hash::make('admin12345'),
        ]);

        $technologies = [
            ['name' =>  'Vue.js 3', 'category'  =>  'frontend'],
            ['name' =>  'Tailwind CSS', 'category'  =>  'frontend'],
            ['name' =>  'Laravel 11', 'category'  =>  'backend'],
            ['name' =>  'MySQL', 'category'  =>  'database'],
            ['name' =>  'Vite', 'category'  =>  'tools'],
        ];

        foreach ($technologies as $tech) {
            Technology::create($tech);
        }
    }
}
