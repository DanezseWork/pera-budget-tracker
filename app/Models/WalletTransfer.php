<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WalletTransfer extends Model
{
    protected $table = 'wallet_transfers';

    protected $fillable = [
        'from_wallet_id',
        'to_wallet_id',
        'amount',
        'description',
    ];

    /**
     * Wallet money is transferred FROM
     */
    public function fromWallet()
    {
        return $this->belongsTo(Wallet::class, 'from_wallet_id');
    }

    /**
     * Wallet money is transferred TO
     */
    public function toWallet()
    {
        return $this->belongsTo(Wallet::class, 'to_wallet_id');
    }

    public function outgoingTransfers()
    {
        return $this->hasMany(WalletTransfer::class, 'from_wallet_id');
    }

    public function incomingTransfers()
    {
        return $this->hasMany(WalletTransfer::class, 'to_wallet_id');
    }
}
