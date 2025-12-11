<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'starting_balance' => 'required|numeric|min:0',
            'color' => 'nullable|string|max:20',
            'icon' => 'nullable|image|max:2048',
            'description' => 'nullable|string',
        ]);

        // Handle icon upload
        if ($request->hasFile('icon')) {
            $validated['icon'] = $request->file('icon')->store('wallet_icons', 'public');
        }

        Wallet::create([
            'user_id' => Auth::id(),
            'name' => $validated['name'],
            'starting_balance' => $validated['starting_balance'],
            'current_balance' => $validated['starting_balance'],
            'color' => $validated['color'] ?? null,
            'description' => $validated['description'] ?? null,
            'icon' => $validated['icon'] ?? null,
        ]);

        return back()->with('success', 'Wallet created successfully!');
    }
}
