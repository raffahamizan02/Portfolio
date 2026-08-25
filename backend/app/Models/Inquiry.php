<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    public $timestamps = false; // Jika migrasi hanya memakai created_at

    protected $fillable = [
        'sender_name',
        'email',
        'subject',
        'message',
        'ip_address',
    ];
}