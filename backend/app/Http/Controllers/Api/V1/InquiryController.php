<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\Request;

class InquiryController extends Controller
{
    public function store(Request $request) {
        $validated = $request->validate([
            'sender_nama'   =>  'required|string|max:100',
            'email'         => 'required|email|max:150',
            'subject'         => 'required|string|max:200',
            'message'         => 'required|string',
        ]);

        $inquiry = Inquiry::create([
            ...$validated,
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'message'   => 'Pesan Anda berhasil terkirim!',
            'data'      => $inquiry,
        ], 201);
    }
}
