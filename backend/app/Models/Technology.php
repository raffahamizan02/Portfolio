<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Technology extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'name',
        'category',
        'icon_svg'
    ];

    public function projects(): BelongsToMany {
        return $this->belongsToMany(Project::class);
    }
}
