<?php

namespace App\Http\Controllers;

use App\Models\Wallet;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $userId = request()->user()->id;

        return Inertia::render('Dashboard', [
            'wallets' => Wallet::where('user_id', $userId)->get(),
        ]);
    }
}
