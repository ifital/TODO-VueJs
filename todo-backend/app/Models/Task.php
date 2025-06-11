<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;  // <-- ajoute ceci
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;  // <-- ajoute ceci

    protected $fillable = ['title', 'description', 'completed'];
}
