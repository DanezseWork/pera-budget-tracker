<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\WalletTransfer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:add,subtract,transfer',
            'from_wallet_id' => 'nullable|required_if:type,subtract,transfer|exists:wallets,id',
            'to_wallet_id' => 'nullable|required_if:type,add,transfer|exists:wallets,id',
            'amount' => 'required|numeric|min:0.01',
            'description' => 'nullable|string|max:255',
        ]);

        DB::transaction(function () use ($validated) {
            $userId = Auth::id();
            $amount = $validated['amount'];

            if ($validated['type'] === 'add') {
                $wallet = Wallet::where('id', $validated['to_wallet_id'])
                    ->where('user_id', $userId)
                    ->lockForUpdate()
                    ->firstOrFail();

                $wallet->increment('current_balance', $amount);

                Transaction::create([
                    'wallet_id' => $wallet->id,
                    'amount' => $amount,
                    'type' => 'add',
                    'user_id' => $userId,
                    'description' => $validated['description'] ?? null,
                    'date' => now(),
                ]);
            }

            if ($validated['type'] === 'subtract') {
                $wallet = Wallet::where('id', $validated['from_wallet_id'])
                    ->where('user_id', $userId)
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($wallet->current_balance < $amount) {
                    abort(422, 'Insufficient wallet balance.');
                }

                $wallet->decrement('current_balance', $amount);

                Transaction::create([
                    'wallet_id' => $wallet->id,
                    'amount' => $amount,
                    'type' => 'subtract',
                    'user_id' => $userId,
                    'description' => $validated['description'] ?? null,
                    'date' => now(),
                ]);
            }

            if ($validated['type'] === 'transfer') {
                if ($validated['from_wallet_id'] === $validated['to_wallet_id']) {
                    abort(422, 'Cannot transfer to the same wallet.');
                }

                $from = Wallet::where('id', $validated['from_wallet_id'])
                    ->where('user_id', $userId)
                    ->lockForUpdate()
                    ->firstOrFail();

                $to = Wallet::where('id', $validated['to_wallet_id'])
                    ->where('user_id', $userId)
                    ->lockForUpdate()
                    ->firstOrFail();

                if ($from->current_balance < $amount) {
                    abort(422, 'Insufficient wallet balance.');
                }

                $from->decrement('current_balance', $amount);
                $to->increment('current_balance', $amount);

                WalletTransfer::create([
                    'from_wallet_id' => $from->id,
                    'to_wallet_id' => $to->id,
                    'amount' => $amount,
                    'description' => $validated['description'] ?? null,
                ]);

                // Optional: record transactions for history
                Transaction::create([
                    'wallet_id' => $from->id,
                    'amount' => $amount,
                    'type' => 'transfer_out',
                    'user_id' => $userId,
                    'description' => $validated['description'] ?? null,
                    'date' => now(),
                ]);

                Transaction::create([
                    'wallet_id' => $to->id,
                    'amount' => $amount,
                    'type' => 'transfer_in',
                    'user_id' => $userId,
                    'description' => $validated['description'] ?? null,
                    'date' => now(),
                ]);
            }
        });

        return back()->with('success', 'Transaction completed successfully.');
    }

    public function index()
    {
        $userId = Auth::id();

        $transactions = Transaction::query()
            ->with('wallet:id,name')
            ->where('user_id', Auth::id())
            ->orderBy('date', 'desc')  // ✅ latest first
            ->get([
                'id',
                'wallet_id',
                'amount',
                'type',
                'date',
                'description',
                'created_at',
            ]);

        $wallets = Wallet::where('user_id', $userId)->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'wallets' => $wallets,
        ]);
    }
}
