import WalletStatCard from "./WalletStatCard";
import { DollarSign, Wallet, PiggyBank } from "lucide-react";
import type { WalletModel } from "@/types/wallet";

type WalletStatsGridProps = {
  wallets: WalletModel[];
};

export default function WalletStatsGrid({ wallets }: WalletStatsGridProps) {
  const iconMap: Record<string, any> = {
    default: DollarSign,
    wallet: Wallet,
    savings: PiggyBank,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {wallets.map((wallet) => (
        <WalletStatCard
          key={wallet.id}
          name={wallet.name}
          description={wallet.description ?? ""}
          current_balance={wallet.current_balance}
          starting_balance={wallet.starting_balance}
          icon={iconMap[wallet.type ?? "default"] || iconMap.default}
          color={wallet.color ?? "#38bdf8"}
        />
      ))}
    </div>
  );
}
