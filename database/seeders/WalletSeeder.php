<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;

class WalletSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            return;
        }

        foreach ($users as $user) {
            Wallet::create([
                'user_id' => $user->id,
                'name' => 'Cash Wallet',
                'type' => 'cash',
                'starting_balance' => 5000.00,
                'current_balance' => 5000.00,
                'color' => 'green',
            ]);

            Wallet::create([
                'user_id' => $user->id,
                'name' => 'Bank Account',
                'type' => 'bank',
                'starting_balance' => 15000.00,
                'current_balance' => 15000.00,
                'color' => 'blue',
            ]);

            Wallet::create([
                'user_id' => $user->id,
                'name' => 'GCash',
                'type' => 'e-wallet',
                'starting_balance' => 2500.00,
                'current_balance' => 2500.00,
                'color' => 'violet',
            ]);
        }
    }
}