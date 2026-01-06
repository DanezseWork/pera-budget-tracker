import WalletStatCard from "./WalletStatCard";
import { WALLET_ICONS } from "@/constants/wallet-icons";
import type { WalletModel } from "@/types/wallet";

type WalletStatsGridProps = {
  wallets: WalletModel[];
};

export default function WalletStatsGrid({ wallets }: WalletStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {wallets.map((wallet) => {
        const Icon = WALLET_ICONS[wallet.icon ?? "wallet"];

        return (
          <WalletStatCard
            key={wallet.id}
            name={wallet.name}
            description={wallet.description ?? ""}
            current_balance={wallet.current_balance}
            starting_balance={wallet.starting_balance}
            icon={Icon}
            color={wallet.color ?? "#38bdf8"}
          />
        );
      })}
    </div>
  );
}
