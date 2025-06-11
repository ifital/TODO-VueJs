<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Task;

class TaskSeeder extends Seeder
{
    public function run()
    {
        // Exemple avec création manuelle
        Task::create([
            'title' => 'Première tâche',
            'description' => 'Description de la première tâche',
            'completed' => false,
        ]);

        // Ou avec factory (voir plus bas)
        Task::factory()->count(5)->create();
    }
}
