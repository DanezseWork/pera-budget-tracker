<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'amount',
        'type',
        'category_id',
        'wallet_id',  // <-- NEW
        'user_id',
        'date',
        'description'
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::created(function ($transaction) {
            $wallet = $transaction->wallet;

            if ($transaction->type === 'income') {
                $wallet->increment('current_balance', $transaction->amount);
            } else {
                $wallet->decrement('current_balance', $transaction->amount);
            }
        });

        static::deleted(function ($transaction) {
            $wallet = $transaction->wallet;

            if ($transaction->type === 'income') {
                $wallet->decrement('current_balance', $transaction->amount);
            } else {
                $wallet->increment('current_balance', $transaction->amount);
            }
        });
    }
}
